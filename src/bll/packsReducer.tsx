import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAppDispatch } from "./store/store";
import { packsAPI } from "../dal/cardsAPI";
import { TPack, TPacksParams } from "../dal/ResponseTypes";

export type TPacks = {
    isFetching: boolean;
    cardPacks: TPack[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
};
const initialState: TPacks = {
    isFetching: false,
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
    page: 1,
    pageCount: 12,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: "",
    tokenDeathTime: 0,
};

const slice = createSlice({
    name: "packs",
    initialState: initialState,
    reducers: {
        setIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload;
        },
        setPacks(state, action: PayloadAction<TPacks>) {
            return action.payload;
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
            console.log(res.data);
            dispatch(setPacks(res.data));
            dispatch(setIsFetching(false));
        })
        .catch((e) => {
            // const err = e.response
            //     ? e.response.data.error
            //     : e.message + ", more details in the console";
            // dispatch(setAppMessage({ text: err, severity: "error" }));
        });
};
