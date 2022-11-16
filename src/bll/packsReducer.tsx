import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAppDispatch } from "./store/store";
import { packsAPI } from "../dal/cardsAPI";
import { TPack, TPacksParams } from "../dal/ResponseTypes";

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
    isFetching: boolean;
    cardPacksData: TPacksData;
};
const initialState: TPacks = {
    isFetching: false,
    cardPacksData: {
        cardPacks: [],
        user_id: "",
        page: 1,
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
        setIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload;
        },
        setPacks(state, action: PayloadAction<TPacksData>) {
            state.cardPacksData = action.payload;
        },
    },
});

export const packsReducer = slice.reducer;
export const { setIsFetching, setPacks } = slice.actions;

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
