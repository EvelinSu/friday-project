import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAppDispatch } from "./store/store";
import { packsAPI } from "../dal/cardsAPI";
import { TPack } from "../dal/ResponseTypes";

export type TPacks = {
    isFetching: boolean;
    packs: TPack[];
    pageCount: number;
    cardPacksTotalCount: number;
};
const initialState: TPacks = {
    isFetching: false,
    packs: [],
    pageCount: 12,
    cardPacksTotalCount: 0,
};

const slice = createSlice({
    name: "packs",
    initialState: initialState,
    reducers: {
        setIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload;
        },
        setPacks(
            state,
            action: PayloadAction<{
                packs: TPack[];
                pageCount: number;
                cardPacksTotalCount: number;
            }>
        ) {
            return { ...state, ...action.payload };
        },
    },
});

export const packsReducer = slice.reducer;
export const { setIsFetching, setPacks } = slice.actions;

export const getPacks =
    (page: number, pageCount: number, userId?: string) =>
    (dispatch: TAppDispatch) => {
        dispatch(setIsFetching(true));

        packsAPI
            .getPacks(page, pageCount)
            .then((res) => {
                const { cardPacksTotalCount, cardPacks, pageCount } = res.data;
                dispatch(
                    setPacks({
                        packs: cardPacks,
                        pageCount,
                        cardPacksTotalCount,
                    })
                );
                dispatch(setIsFetching(false));
            })
            .catch((e) => {
                // const err = e.response
                //     ? e.response.data.error
                //     : e.message + ", more details in the console";
                // dispatch(setAppMessage({ text: err, severity: "error" }));
            });
    };
