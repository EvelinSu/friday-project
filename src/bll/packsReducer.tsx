import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAppDispatch } from "./store/store";
import { packsAPI } from "../dal/cardsAPI";
import { TNewCardsPack, TPack, TPacksParams } from "../dal/ResponseTypes";
import { setAppMessage } from "./appReducer";
import { setIsFetching } from "./authReducer";

export type TPacksData = {
    cardPacks: TPack[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    user_id: string;
    token: string;
    tokenDeathTime: number;
};

export type TPacks = {
    cardPacksData: TPacksData;
};
const initialState: TPacks = {
    cardPacksData: {
        cardPacks: [
            {
                _id: "",
                user_id: "",
                user_name: "",
                private: false,
                name: "",
                path: "",
                grade: 0,
                shots: 0,
                cardsCount: 0,
                type: "",
                rating: 0,
                created: "",
                updated: "",
                more_id: "",
                __v: 0,
                deckCover: "",
            },
        ],
        user_id: "",
        page: 0,
        pageCount: 12,
        cardPacksTotalCount: 0,
        minCardsCount: 0,
        maxCardsCount: 0,
        token: "",
        tokenDeathTime: 0,
    },
};

const slice = createSlice({
    name: "packs",
    initialState: initialState,
    reducers: {
        setPacks(state, action: PayloadAction<TPacksData>) {
            state.cardPacksData = action.payload;
        },
        clearStatePacks(state, action) {
            state = initialState;
        },
    },
});

export const packsReducer = slice.reducer;
export const { setPacks, clearStatePacks } = slice.actions;

export const loadPacks = (param: TPacksParams) => (dispatch: TAppDispatch) => {
    dispatch(setIsFetching(true));
    packsAPI
        .getPacks(param)
        .then((res) => {
            dispatch(setPacks(res.data));
        })
        .catch((e) => {
            // const err = e.response
            //     ? e.response.data.error
            //     : e.message + ", more details in the console";
            // dispatch(setAppMessage({ text: err, severity: "error" }));
        })
        .finally(() => dispatch(setIsFetching(false)));
};

export const addNewPack = createAsyncThunk(
    "packs/addNewPack",
    async (
        paramThunk: { newCardsPack: TNewCardsPack; param: TPacksParams },
        { dispatch, rejectWithValue }
    ) => {
        try {
            dispatch(setIsFetching(true));
            await packsAPI.addPack(paramThunk.newCardsPack);
            dispatch(setIsFetching(false));
            dispatch(
                setAppMessage({
                    text: "New pack created",
                    severity: "success",
                })
            );
            dispatch(loadPacks(paramThunk.param));
        } catch (e) {
            dispatch(setIsFetching(false));

            dispatch(
                setAppMessage({
                    text: "something went wrong try again later",
                    severity: "error",
                })
            );
        }
    }
);
