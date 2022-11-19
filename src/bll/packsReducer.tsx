import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAppDispatch } from "./store/store";
import { packsAPI } from "../dal/cardsAPI";
import { TPack, TPacksParams } from "../dal/ResponseTypes";
import { setAppMessage } from "./appReducer";
import { setIsFetching } from "./authReducer";
import { getUser } from "./userReducer";
import { TAddAndUpdatePackModalValues } from "../ui/pages/PacksList/AddAndUpdatePackModal/AddAndUpdatePackModal";
import axios, { AxiosError } from "axios";

export type TPacksData = {
    cardPacks: TPack[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
};

export type TPacks = {
    isModalButtonsDisabled: boolean;
    cardPacksData: TPacksData;
};
const initialState: TPacks = {
    isModalButtonsDisabled: false,
    cardPacksData: {
        cardPacks: [],
        // user_id: "",
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
            state.cardPacksData = initialState.cardPacksData;
        },
        setIsModalButtonsDisabled(state, action: PayloadAction<boolean>) {
            state.isModalButtonsDisabled = action.payload;
        },
    },
});

export const packsReducer = slice.reducer;
export const { setPacks, clearStatePacks, setIsModalButtonsDisabled } = slice.actions;

export const loadPacks = createAsyncThunk(
    "packs/loadPacks",
    async (param: TPacksParams, { dispatch }) => {
        dispatch(setIsFetching(true));
        try {
            const res = await packsAPI.getPacks(param);
            dispatch(setPacks(res.data));
            if (param.user_id) {
                dispatch(getUser(param.user_id));
            }
        } catch (e) {
            // Некорректная ошибка. Должна быть 429, а возвращается 401.
            // const err = e.response
            //     ? e.response.data.error
            //     : e.message + ", more details in the console";
            // dispatch(setAppMessage({ text: err, severity: "error" }));
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export const addNewPack =
    (newCardsPack: TAddAndUpdatePackModalValues, param: TPacksParams) =>
    async (dispatch: TAppDispatch) => {
        dispatch(setIsModalButtonsDisabled(true));
        const { name, deckCover, isPrivate } = newCardsPack;
        try {
            await packsAPI.addPack({ name, deckCover, private: isPrivate });
            dispatch(loadPacks(param));

            dispatch(setAppMessage({ text: "New pack created", severity: "success" }));
        } catch (e) {
            dispatch(setAppMessage({ text: "something went wrong try again later", severity: "error" }));
        } finally {
            dispatch(setIsModalButtonsDisabled(false));
        }
    };

export const deletePack = (id: string, paramURL: TPacksParams) => async (dispatch: TAppDispatch) => {
    dispatch(setIsModalButtonsDisabled(true));
    try {
        await packsAPI.deletePack(id);
        dispatch(loadPacks(paramURL));
        dispatch(setAppMessage({ text: "Done!", severity: "success" }));
    } catch (e) {
        const err = e as Error | AxiosError;
        if (axios.isAxiosError(err)) {
            const errorMessage = err.response?.data ? err.response.data : err;
            dispatch(setAppMessage({ text: errorMessage.error, severity: "error" }));
        }
    } finally {
        dispatch(setIsModalButtonsDisabled(false));
    }
};

export const updatePack = createAsyncThunk(
    "packs/updatePack",
    async (
        param: { values: TAddAndUpdatePackModalValues; _id: string; paramURL: TPacksParams },
        { dispatch }
    ) => {
        dispatch(setIsModalButtonsDisabled(true));
        try {
            const { name, deckCover, isPrivate } = param.values;
            await packsAPI.updatePack({ _id: param._id, name, deckCover, private: isPrivate });
            dispatch(loadPacks(param.paramURL));
            dispatch(setAppMessage({ text: "Done!", severity: "success" }));
        } catch (e) {
            const err = e as Error | AxiosError;
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data ? err.response.data : err;
                dispatch(setAppMessage({ text: errorMessage.error, severity: "error" }));
            }
        } finally {
            dispatch(setIsModalButtonsDisabled(false));
        }
    }
);
