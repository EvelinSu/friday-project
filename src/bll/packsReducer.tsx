import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cardsAPI } from "../dal/cardsAPI";
import { TPacksParams, TResponsePack } from "../dal/ResponseTypes";
import { setAppMessage, setIsFetching } from "./appReducer";
import { getUser } from "./usersReducer";
import { TAddAndUpdatePackModalValues } from "../ui/pages/PacksPage/PacksModals/AddAndUpdatePackModal";
import { handlerErrors } from "../common/utils/handlerErrors";

export type TPacks = {
    isButtonsDisabled: boolean;
    cardPacksData: TResponsePack;
};
const initialState: TPacks = {
    isButtonsDisabled: false,
    cardPacksData: {
        cardPacks: [],
        user_id: "",
        page: 1,
        pageCount: 12,
        cardPacksTotalCount: 0,
        minCardsCount: 0,
        maxCardsCount: 5,
        token: "",
    },
};

export const loadPacks = createAsyncThunk(
    "packs/loadPacks",
    async (param: TPacksParams, { dispatch, rejectWithValue }) => {
        dispatch(setIsFetching(true));
        try {
            const res = await cardsAPI.getPacks(param);
            dispatch(setPacks(res.data));
            if (param.user_id) {
                dispatch(getUser(param.user_id));
            }
        } catch (e) {
            // Incorrect error. Must be 429, but is 401.
            dispatch(
                setAppMessage({
                    text: "Too many requests. The server may have logged you out (sorry)",
                    severity: "error",
                })
            );
            return rejectWithValue({});
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export const addNewPack = createAsyncThunk(
    "packs/addNewPack",
    async (
        param: { newCardsPack: TAddAndUpdatePackModalValues; paramURL: TPacksParams },
        { dispatch }
    ) => {
        dispatch(setIsButtonsDisabled(true));
        const { name, deckCover, isPrivate } = param.newCardsPack;
        try {
            await cardsAPI.addPack({ name, deckCover, private: isPrivate });
            dispatch(loadPacks(param.paramURL));
            dispatch(setAppMessage({ text: "New pack created", severity: "success" }));
            return true;
        } catch (e) {
            handlerErrors(dispatch, e);
            return false;
        } finally {
            dispatch(setIsButtonsDisabled(false));
        }
    }
);

export const deletePack = createAsyncThunk(
    "packs/deletePack",
    async (param: { id: string; paramURL: TPacksParams }, { dispatch, rejectWithValue }) => {
        dispatch(setIsButtonsDisabled(true));
        try {
            await cardsAPI.deletePack(param.id);
            dispatch(loadPacks(param.paramURL));
            dispatch(setAppMessage({ text: "Done!", severity: "success" }));
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsButtonsDisabled(false));
        }
    }
);

export const updatePack = createAsyncThunk(
    "packs/updatePack",
    async (
        param: { values: TAddAndUpdatePackModalValues; _id: string; paramURL: TPacksParams },
        { dispatch }
    ) => {
        dispatch(setIsButtonsDisabled(true));
        try {
            const { name, deckCover, isPrivate } = param.values;
            await cardsAPI.updatePack({ _id: param._id, name, deckCover, private: isPrivate });
            dispatch(loadPacks(param.paramURL));
            dispatch(setAppMessage({ text: "Done!", severity: "success" }));
        } catch (e) {
            handlerErrors(dispatch, e);
        } finally {
            dispatch(setIsButtonsDisabled(false));
        }
    }
);

const slice = createSlice({
    name: "packs",
    initialState: initialState,
    reducers: {
        setPacks(state, action: PayloadAction<TResponsePack>) {
            state.cardPacksData = action.payload;
        },
        clearStatePacks(state) {
            state.cardPacksData = initialState.cardPacksData;
        },
        setIsButtonsDisabled(state, action: PayloadAction<boolean>) {
            state.isButtonsDisabled = action.payload;
        },
    },
});

export const packsReducer = slice.reducer;
export const { setPacks, clearStatePacks, setIsButtonsDisabled } = slice.actions;
