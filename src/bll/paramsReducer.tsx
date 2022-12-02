import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TCardsParams, TPacksParams } from "../dal/ResponseTypes";

const initialState: TParams = {
    packsParams: {
        packName: "",
        min: "",
        max: "",
        sortPacks: "",
        page: "1",
        pageCount: "12",
        user_id: "",
    },
    cardsParams: {
        cardAnswer: "",
        cardQuestion: "",
        cardsPack_id: "",
        min: "",
        max: "",
        sortCards: "",
        page: "1",
        pageCount: "12",
    },
};

type TParams = {
    packsParams: TPacksParams;
    cardsParams: TCardsParams;
};
const slice = createSlice({
    name: "cardPacksParams",
    initialState: initialState,
    reducers: {
        setPacksParams(state, action: PayloadAction<TPacksParams>) {
            state.packsParams = action.payload;
        },
        setCardsParams(state, action: PayloadAction<TCardsParams>) {
            state.cardsParams = action.payload;
        },
        setUserCardParams(state, action: PayloadAction<TPacksParams>) {
            state.packsParams.user_id = action.payload.user_id;
        },
    },
});

export const paramsReducer = slice.reducer;
export const { setPacksParams, setUserCardParams, setCardsParams } = slice.actions;
