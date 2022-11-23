import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TCardsParams, TNewCard, TResponseCard} from "../dal/ResponseTypes";
import {setAppMessage, setIsFetching} from "./appReducer";
import {cardsAPI} from "../dal/cardsAPI";
import {setIsButtonsDisabled} from "./packsReducer";
import {TAddAndUpdateCardModalValues} from "../ui/pages/CardsPage/CardsModals/AddAndUpdateCardModal";
import {handlerErrors} from "../common/utils/handlerErrors";

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
};

export const loadCards = createAsyncThunk(
    "cards/loadCards",
    async (param: TCardsParams, {dispatch, rejectWithValue}) => {
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
            return rejectWithValue({});
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export const addNewCard = createAsyncThunk(
    "cards/addNewCard",
    async (param: { cardsParams: TCardsParams; newCard: TNewCard }, {dispatch, rejectWithValue}) => {
        dispatch(setIsFetching(true));
        dispatch(setIsButtonsDisabled(true));
        try {
            await cardsAPI.addCard(param.newCard);
            dispatch(loadCards(param.cardsParams));
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
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
        {dispatch, rejectWithValue}
    ) => {
        dispatch(setIsButtonsDisabled(true));
        try {
            await cardsAPI.updateCard({...param.values, _id: param._id});
            dispatch(loadCards(param.paramURL));
            dispatch(setAppMessage({text: "Done!", severity: "success"}));
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsButtonsDisabled(false));
        }
    }
);

export const deleteCard = createAsyncThunk(
    "cards/deleteCard",
    async (param: { id: string; URLParams: TCardsParams }, {dispatch, rejectWithValue}) => {
        dispatch(setIsButtonsDisabled(true));
        try {
            await cardsAPI.deleteCard(param.id);
            dispatch(loadCards(param.URLParams));
            dispatch(setAppMessage({text: "Done!", severity: "success"}));
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsButtonsDisabled(false));
        }
    }
);

const slice = createSlice({
    name: "cards",
    initialState: {
        isButtonsDisabled: false,
        cardsData: initialCardsData,
    } as TCards,
    reducers: {
        setCards(state, action: PayloadAction<TResponseCard>) {
            state.cardsData = action.payload;
        },
    },
});

export const {setCards} = slice.actions;
export const cardsReducer = slice.reducer;
