import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TAppDispatch} from "./store/store";
import {packsAPI, TPack} from "../dal/api";
import {setAppError} from "./appReducer";

export type TPacks = {
    isFetching: boolean;
    packs: TPack[];
    // page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    currentPage: number;
};
const initialState: TPacks = {
    isFetching: false,
    packs: [],
    // page: 0,
    pageCount: 0,
    cardPacksTotalCount: 0,
    currentPage: 1,
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
        setIsFetching(true);

        packsAPI
            .getPacks(page, pageCount)
            .then((res) => {
                const { cardPacksTotalCount, cardPacks, pageCount } = res.data;
                console.log(res);
                dispatch(
                    setPacks({
                        packs: cardPacks,
                        pageCount,
                        cardPacksTotalCount,
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

    }