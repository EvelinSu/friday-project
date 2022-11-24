import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {userAPI} from "../dal/userAPI";
import {setIsFetching} from "./appReducer";
import {TUserData} from "../dal/ResponseTypes";
import {handlerErrors} from "../common/utils/handlerErrors";

type TInitialState = {
    isUserProfileOpen: boolean,
    isUserFetching: boolean
    userData: TUserData,
}

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
    }
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<TUserData>) {
            state.userData = action.payload;
        },
        setIsUserProfileOpen(state, action: PayloadAction<boolean>) {
            state.isUserProfileOpen = action.payload
        },
        setIsUserFetching(state, action: PayloadAction<boolean>) {
            state.isUserFetching = action.payload
        }
    },
});

export const getUser = createAsyncThunk(
    "user/getUser",
    async (id: string, {dispatch, rejectWithValue}) => {
        dispatch(setIsUserFetching(true));
        try {
            const res = await userAPI.getUser(id);
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

export const userReducer = slice.reducer;
export const {setUser, setIsUserProfileOpen, setIsUserFetching} = slice.actions;
