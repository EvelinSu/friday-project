import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userAPI } from "../dal/userAPI";
import { setIsFetching } from "./appReducer";
import { TUserData } from "../dal/ResponseTypes";
import { handlerErrors } from "../common/utils/handlerErrors";

const initialState: TUserData = {
    _id: "",
    email: "",
    isAdmin: false,
    name: "",
    verified: false,
    publicCardPacksCount: 0,
    created: "",
    updated: "",
    avatar: "",
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<TUserData>) {
            return action.payload;
        },
    },
});

export const getUser = createAsyncThunk(
    "user/getUser",
    async (id: string, { dispatch, rejectWithValue }) => {
        dispatch(setIsFetching(true));
        try {
            const res = await userAPI.getUser(id);
            dispatch(setUser(res.data.user));
            dispatch(setIsFetching(false));
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export const userReducer = slice.reducer;
export const { setUser } = slice.actions;
