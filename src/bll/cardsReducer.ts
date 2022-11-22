import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TCardsParams, TNewCard, TResponseCard} from "../dal/ResponseTypes";
import {setAppMessage, setIsFetching} from "./appReducer";
import {cardsAPI} from "../dal/cardsAPI";
import axios, {AxiosError} from "axios";
import {setIsButtonsDisabled} from "./packsReducer";
import {TAppDispatch} from "./store/store";
import {TAddAndUpdateCardModalValues} from "../ui/pages/CardsPage/CardsModals/AddAndUpdateCardModal";

export type TCards = {
    isButtonsDisabled: boolean;
    cardsData: TResponseCard;
};

export const initialCardsData = {
    cards: [],
    cardsTotalCount: 12,
    maxGrade: 0,
    minGrade: 0,
    packCreated: "",
    packDeckCover: "",
    packName: "",
    packPrivate: false,
    packUpdated: "",
    packUserId: "",
    page: 1,
    pageCount: 12,
}

const initialState: TCards = {
    isButtonsDisabled: false,
    cardsData: initialCardsData,
};

const slice = createSlice({
    name: "cards",
    initialState: initialState,
    reducers: {
        setCards(state, action: PayloadAction<TResponseCard>) {
            state.cardsData = action.payload;
        },

    },
});

export const loadCards = createAsyncThunk(
    "cards/loadCards",
    async (param: TCardsParams, {dispatch}) => {
        dispatch(setIsFetching(true));
        try {
            const res = await cardsAPI.getCards(param);
            dispatch(setCards(res.data));
        } catch (e) {
            // Incorrect error. Must be 429, but is 401.
            // const err = e.response
            //     ? e.response.data.error
            //     : e.message + ", more details in the console";
            // dispatch(setAppMessage({ text: err, severity: "error" }));
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export const addNewCard = createAsyncThunk(
    "cards/addNewCard",
    async (param: { cardsParams: TCardsParams, newCard: TNewCard, }, {dispatch}) => {
        dispatch(setIsFetching(true));
        dispatch(setIsButtonsDisabled(true));
        try {
            await cardsAPI.addCard(param.newCard);
            dispatch(loadCards(param.cardsParams));
        } catch (e: unknown) {
            const err = e as Error | AxiosError<{ e: string }>;
            if (axios.isAxiosError(err)) {
                const error = err.response?.data
                    ? err.response.data.error
                    : err.message + ", more details in the console";
                dispatch(setAppMessage({text: error, severity: "error"}));
            }
            return false;
        } finally {
            dispatch(setIsFetching(false));
            dispatch(setIsButtonsDisabled(false));

        }
    }
);

export const updateCard = createAsyncThunk(
    "cards/updateCard",
    async (
        param: { values: TAddAndUpdateCardModalValues; _id: string; paramURL: TCardsParams },
        {dispatch}
    ) => {
        dispatch(setIsButtonsDisabled(true));
        try {
            await cardsAPI.updateCard({...param.values, _id: param._id});
            dispatch(loadCards(param.paramURL));
            dispatch(setAppMessage({text: "Done!", severity: "success"}));
        } catch (e) {
            const err = e as Error | AxiosError;
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data ? err.response.data : err;
                dispatch(setAppMessage({text: errorMessage.error, severity: "error"}));
            }
        } finally {
            dispatch(setIsButtonsDisabled(false));
        }
    }
);

export const deleteCard = (id: string, paramURL: TCardsParams) => async (dispatch: TAppDispatch) => {
    dispatch(setIsButtonsDisabled(true));
    try {
        await cardsAPI.deleteCard(id);
        dispatch(loadCards(paramURL));
        dispatch(setAppMessage({text: "Done!", severity: "success"}));
    } catch (e) {
        const err = e as Error | AxiosError;
        if (axios.isAxiosError(err)) {
            const errorMessage = err.response?.data ? err.response.data : err;
            dispatch(setAppMessage({text: errorMessage.error, severity: "error"}));
        }
    } finally {
        dispatch(setIsButtonsDisabled(false));
    }
};

export const {setCards} = slice.actions
export const cardsReducer = slice.reducer