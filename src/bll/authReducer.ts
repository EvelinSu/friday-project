import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../dal/authAPI";
import { TAppDispatch } from "./store/store";
import { setAppMessage, setAppStatus, setIsFetching, setIsInitialized } from "./appReducer";
import { TLoginData, TProfileData, TRegisterData } from "../dal/ResponseTypes";
import { clearStatePacks } from "./packsReducer";
import axios, { AxiosError } from "axios";

type TUserData = {
    id: string | null;
    name: string | null;
    email: string | null;
    avatar?: string | null;
};

export type TAuth = {
    userData: TUserData;
    registerData: TRegisterData;
    isLoggedIn: boolean;
};
const initialState: TAuth = {
    userData: {
        id: null,
        name: null,
        email: null,
        avatar: null,
    },
    registerData: {
        email: "",
        password: "",
    },
    isLoggedIn: false,
};

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        },
        setUserData(state, action: PayloadAction<TUserData>) {
            state.userData = action.payload;
        },
        setUserProfile(state, action: PayloadAction<TProfileData>) {
            if (action.payload.avatar) state.userData.avatar = action.payload.avatar;
            if (action.payload.name) state.userData.name = action.payload.name;
        },

        setRegisterUserData(state, action: PayloadAction<TRegisterData>) {
            state.registerData = action.payload;
        },
    },
});

export const registerTC = createAsyncThunk(
    "auth/register",
    async (param: TRegisterData, { dispatch }) => {
        dispatch(setIsFetching(true));
        try {
            await authAPI.register(param);
            dispatch(setRegisterUserData(param));
            dispatch(setAppMessage({ text: "Registration was successful!", severity: "success" }));
            return true;
        } catch (e: unknown) {
            const err = e as Error | AxiosError<{ e: string }>;
            if (axios.isAxiosError(err)) {
                const error = err.response?.data
                    ? err.response.data.error
                    : err.message + ", more details in the console";
                dispatch(setAppMessage({ text: error, severity: "error" }));
            }
            return false;
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export const authMeTC = () => async (dispatch: TAppDispatch) => {
    try {
        dispatch(setIsInitialized({ value: false }));
        dispatch(setAppStatus("loading"));
        const me = await authAPI.authMe();
        const { name, email, avatar } = me.data.data;
        const id = me.data.data._id;
        await dispatch(setUserData({ id, name, email, avatar }));
        dispatch(setIsLoggedIn({ value: true }));
    } catch (e) {
        dispatch(setIsLoggedIn({ value: false }));
    } finally {
        dispatch(setIsInitialized({ value: true }));
    }
};

export const loginTC = (data: TLoginData) => async (dispatch: TAppDispatch) => {
    dispatch(setIsFetching(true));
    authAPI
        .login(data)
        .then((res) => {
            const { name, email, avatar } = res.data;
            const id = res.data._id;
            dispatch(setUserData({ id, name, email, avatar }));
            dispatch(setIsLoggedIn({ value: true }));
            dispatch(setRegisterUserData({ email: "", password: "" }));
        })
        .catch((e) => {
            const err = e.response ? e.response.data.error : e.message + ", more details in the console";
            dispatch(setAppMessage({ text: err, severity: "error" }));
        })
        .finally(() => dispatch(setIsFetching(false)));
};

export const logOutTC = () => (dispatch: TAppDispatch) => {
    dispatch(setIsFetching(true));
    authAPI
        .logOut()
        .then(() => {
            dispatch(clearStatePacks());
            dispatch(setIsLoggedIn({ value: false }));
        })
        .catch((e) => {
            const err = e.response ? e.response.data.error : e.message + ", more details in the console";
            dispatch(setAppMessage({ text: err, severity: "error" }));
        })
        .finally(() => dispatch(setIsFetching(false)));
};

export const changeUserProfileTC = (data: TProfileData) => (dispatch: TAppDispatch) => {
    authAPI
        .changeUserProfile(data)
        .then(() => {
            dispatch(setUserProfile(data));
            dispatch(setAppMessage({ text: "Successfully!", severity: "success" }));
        })
        .catch((e) => {
            if (e.request.status === 413) {
                dispatch(setAppMessage({ text: e.response.statusText, severity: "error" }));
            } else {
                const err = e.response
                    ? e.response.data.error
                    : e.message + ", more details in the console";
                dispatch(setAppMessage({ text: err, severity: "error" }));
            }
        });
};

export const { setIsLoggedIn, setUserData, setUserProfile, setRegisterUserData } = slice.actions;

export const authReducer = slice.reducer;
