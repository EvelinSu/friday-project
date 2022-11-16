import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TPacksParams } from "../dal/ResponseTypes";

//
const initialState: TPacksParams = {
    packName: undefined,
    min: undefined,
    max: undefined,
    sortPacks: undefined,
    page: 1,
    pageCount: 12,
    user_id: undefined,
};

const slice = createSlice({
    name: "cardPacksParams",
    initialState: initialState,
    reducers: {
        setCardParams(state, action: PayloadAction<TPacksParams>) {
            return action.payload;
        },
        setUserCardParams(state, action: PayloadAction<TPacksParams>) {
            state.user_id = action.payload.user_id;
        },
    },
});

export const packsParamsReducer = slice.reducer;
export const { setCardParams, setUserCardParams } = slice.actions;
