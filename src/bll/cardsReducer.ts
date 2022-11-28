import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCard, TCardsParams, TNewCard, TResponseCard, TUploadGrade } from "../dal/ResponseTypes";
import { setAppMessage, setIsFetching } from "./appReducer";
import { cardsAPI, gradeAPI } from "../dal/cardsAPI";
import { setIsButtonsDisabled } from "./packsReducer";
import { TAddAndUpdateCardModalValues } from "../ui/pages/CardsPage/CardsModals/AddAndUpdateCardModal";
import { handlerErrors } from "../common/utils/handlerErrors";

export type TCards = {
    isButtonsDisabled: boolean;
    cardsData: TResponseCard;
    currentCard: TCard;
    questionCount: number;
    isLearning: boolean;
};

export const initialCardsData: TResponseCard = {
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
    async (param: TCardsParams, { dispatch, rejectWithValue }) => {
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
    async (param: { cardsParams: TCardsParams; newCard: TNewCard }, { dispatch, rejectWithValue }) => {
        dispatch(setIsFetching(true));
        dispatch(setIsButtonsDisabled(true));
        try {
            await cardsAPI.addCard(param.newCard);
            dispatch(loadCards(param.cardsParams));
            dispatch(setAppMessage({ text: "Card successfully added!", severity: "success" }));
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
        { dispatch, rejectWithValue }
    ) => {
        dispatch(setIsButtonsDisabled(true));
        try {
            await cardsAPI.updateCard({ ...param.values, _id: param._id });
            dispatch(loadCards(param.paramURL));
            dispatch(setAppMessage({ text: "Done!", severity: "success" }));
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
    async (param: { id: string; URLParams: TCardsParams }, { dispatch, rejectWithValue }) => {
        dispatch(setIsButtonsDisabled(true));
        try {
            await cardsAPI.deleteCard(param.id);
            dispatch(loadCards(param.URLParams));
            dispatch(setAppMessage({ text: "Done!", severity: "success" }));
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsButtonsDisabled(false));
        }
    }
);

export const uploadGrade = createAsyncThunk(
    "cards/uploadGrade",
    async (data: TUploadGrade, { dispatch, rejectWithValue }) => {
        dispatch(setIsFetching(true));
        try {
            const res = await gradeAPI.updateGrade(data);
            return res.data.updatedGrade;
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

const slice = createSlice({
    name: "cards",
    initialState: {
        isButtonsDisabled: false,
        cardsData: initialCardsData,
        currentCard: {},
        questionCount: 0,
        isLearning: false,
    } as TCards,
    reducers: {
        setCards(state, action: PayloadAction<TResponseCard>) {
            state.cardsData = action.payload;
        },
        setIsLearning(state, action: PayloadAction<boolean>) {
            if (!action.payload && state.currentCard?._id) {
                state.currentCard._id = "";
                state.questionCount = 0;
            }
            state.isLearning = action.payload;
        },
        setCurrentCard(state, action: PayloadAction<TCard>) {
            state.currentCard = action.payload;
        },
        incQuestionCount(state) {
            state.questionCount = state.questionCount + 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(uploadGrade.fulfilled, (state, action) => {
            state.cardsData.cards.map((card) =>
                card._id === action.payload.card_id
                    ? {
                          ...card,
                          grade: action.payload.grade,
                          shorts: action.payload.shots,
                      }
                    : card
            );
        });
    },
});

export const { setCards, setIsLearning, setCurrentCard, incQuestionCount } = slice.actions;
export const cardsReducer = slice.reducer;
