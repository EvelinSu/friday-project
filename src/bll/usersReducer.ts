import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { usersAPI } from "../dal/usersAPI";
import { setIsFetching } from "./appReducer";
import { TResponseUserData, TResponseUsersData, TUsersParams } from "../dal/ResponseTypes";
import { handlerErrors } from "../common/utils/handlerErrors";

type TInitialState = {
    isUserProfileOpen: boolean;
    isUserFetching: boolean;
    userData: TResponseUserData;
    usersData: TResponseUsersData;
};

const initialState: TInitialState = {
    isUserProfileOpen: false,
    isUserFetching: false,
    userData: {
        _id: "",
        email: "",
        isAdmin: false,
        name: "",
        verified: false,
        publicCardPacksCount: 0,
        created: "",
        updated: "",
        avatar: "",
    },
    usersData: {
        maxPublicCardPacksCount: 10,
        minPublicCardPacksCount: 0,
        page: 1,
        pageCount: 12,
        users: [],
        usersTotalCount: 0,
    },
};

const slice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<TResponseUserData>) {
            state.userData = action.payload;
        },
        setIsUserProfileOpen(state, action: PayloadAction<boolean>) {
            state.isUserProfileOpen = action.payload;
        },
        setIsUserFetching(state, action: PayloadAction<boolean>) {
            state.isUserFetching = action.payload;
        },
        setUsers(state, action: PayloadAction<TResponseUsersData>) {
            state.usersData = action.payload;
        },
    },
});

export const getUser = createAsyncThunk(
    "users/getUser",
    async (id: string, { dispatch, rejectWithValue }) => {
        dispatch(setIsUserFetching(true));
        try {
            const res = await usersAPI.getUser(id);
            dispatch(setUser(res.data.user));
            dispatch(setIsFetching(false));
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsUserFetching(false));
        }
    }
);

export const loadUsers = createAsyncThunk(
    "users/loadUsers",
    async (params: TUsersParams, { dispatch, rejectWithValue }) => {
        dispatch(setIsFetching(true));
        try {
            const res = await usersAPI.getUsers(params);
            dispatch(setUsers(res.data));
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export const usersReducer = slice.reducer;
export const { setUser, setIsUserProfileOpen, setIsUserFetching, setUsers } = slice.actions;
