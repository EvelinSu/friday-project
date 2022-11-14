import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAppDispatch } from "./store/store";
import { packsAPI, TPack } from "../dal/api";
import { setAppError } from "./appReducer";

export type TPacks = {
    isFetching: boolean;
    packs: TPack[];
    totalCount: number;
};
const initialState: TPacks = {
    isFetching: true,
    packs: [],
    totalCount: 0,
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
            action: PayloadAction<{ totalCount: number; packs: TPack[] }>
        ) {
            state.packs = action.payload.packs;
            state.totalCount = action.payload.totalCount;
        },
    },
});

export const packsReducer = slice.reducer;
export const { setIsFetching, setPacks } = slice.actions;

export const getPacks =
    (page: number, pageCount: number, userId?: string) =>
    (dispatch: TAppDispatch) => {
        setIsFetching(true);

        packsAPI
            .getPacks(page, pageCount, userId)
            .then((res) => {
                const { cardPacksTotalCount, cardPacks } = res.data;
                console.log(res);
                dispatch(
                    setPacks({
                        totalCount: cardPacksTotalCount,
                        packs: cardPacks,
                    })
                );
            })
            .catch((e) => {
                const err = e.response
                    ? e.response.data.error
                    : e.message + ", more details in the console";
                dispatch(setAppError(err));
            })
            .finally(() => setIsFetching(false));
    };