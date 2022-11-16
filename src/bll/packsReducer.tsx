import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
};

export type TPacks = {
    cardPacksData: TPacksData;
};
const initialState: TPacks = {
    cardPacksData: {
        cardPacks: [],
        user_id: "",
        page: 0,
        pageCount: 12,
        cardPacksTotalCount: 0,
        minCardsCount: 0,
        maxCardsCount: 0,
        token: "",
    },
};

const slice = createSlice({
    name: "packs",
    initialState: initialState,
    reducers: {
        setPacks(state, action: PayloadAction<TPacksData>) {
            state.cardPacksData = action.payload;
        },
        clearStatePacks(state) {
            state = initialState;
        },
    },
});

export const packsReducer = slice.reducer;
export const {setPacks, clearStatePacks} = slice.actions;

export const loadPacks = (param: TPacksParams) => (dispatch: TAppDispatch) => {
    dispatch(setIsFetching(true));
    packsAPI
        .getPacks(param)
        .then((res) => {
            dispatch(setPacks(res.data));
        })
        .catch((e) => {
            // Некорректная ошибка. Должна быть 429, а возвращается 401.

            // const err = e.response
            //     ? e.response.data.error
            //     : e.message + ", more details in the console";
            // dispatch(setAppMessage({ text: err, severity: "error" }));
        })
        .finally(() => dispatch(setIsFetching(false)));
};

export const addNewPack =
    (newCardsPack: TNewCardsPack, param: TPacksParams) => async (dispatch: TAppDispatch) => {
        try {
            dispatch(setIsFetching(true));
            await packsAPI.addPack(newCardsPack);
            dispatch(setIsFetching(false));
            dispatch(
                setAppMessage({
                    text: "New pack created",
                    severity: "success",
                })
            );
            dispatch(loadPacks(param));
        } catch (e) {
            dispatch(setIsFetching(false));

            dispatch(
                setAppMessage({
                    text: "something went wrong try again later",
                    severity: "error",
                })
            );
        }
    };
