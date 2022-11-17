import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOtherUserData } from "../dal/ResponseTypes";
import { userAPI } from "../dal/userAPI";
import { setIsFetching } from "./authReducer";

const initialState: TOtherUserData = {
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
        setUser(state, action: PayloadAction<TOtherUserData>) {
            return action.payload;
        },
    },
});

export const userReducer = slice.reducer;
export const { setUser } = slice.actions;

export const getUser = createAsyncThunk("user/getUser", async (id: string, { dispatch }) => {
    dispatch(setIsFetching(true));
    try {
        const res = await userAPI.getUser(id);
        dispatch(setUser(res.data.user));
        dispatch(setIsFetching(false));
    } catch (e) {
        dispatch(setIsFetching(false));
    }
});
