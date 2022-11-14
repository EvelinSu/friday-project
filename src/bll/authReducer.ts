import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI, LoginDataType, ProfileDataType } from "../dal/api";
import { TAppDispatch } from "./store/store";
import { setAppMessage, setAppStatus, setIsInitialized } from "./appReducer";

export type TAuth = {
    userData: {
        id: string | null;
        name: string | null;
        email: string | null;
        avatar?: string | null;
    };
    isLoggedIn: boolean;
    isFetching: boolean;
};
const initialState: TAuth = {
    userData: {
        id: null,
        name: null,
        email: null,
        avatar: null,
    },
    isLoggedIn: false,
    isFetching: false,
};

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        },
        setUserData(
            state,
            action: PayloadAction<{
                id: string;
                name: string;
                email: string;
                avatar: string;
            }>
        ) {
            state.userData = action.payload;
        },
        setUserProfile(state, action: PayloadAction<ProfileDataType>) {
            state.userData.avatar = action.payload.avatar;
            if (action.payload.name) state.userData.name = action.payload.name;
        },
        setIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload;
        },
    },
});

export const authReducer = slice.reducer;

export const { setIsLoggedIn, setUserData, setUserProfile, setIsFetching } =
    slice.actions;

export const authMeTC = () => (dispatch: TAppDispatch) => {
    dispatch(setAppStatus("loading"));
    authAPI
        .authMe()
        .then((res) => {
            const { id, name, email, avatar } = res.data;
            dispatch(setUserData({ id, name, email, avatar }));
            dispatch(setIsLoggedIn({ value: true }));
        })
        .catch(() => {
            dispatch(setIsLoggedIn({ value: false }));
        })
        .finally(() => dispatch(setIsInitialized({ value: true })));
};

export const loginTC =
    (data: LoginDataType) => async (dispatch: TAppDispatch) => {
        dispatch(setIsFetching(true));
        authAPI
            .login(data)
            .then((res) => {
                const { id, name, email, avatar } = res.data;
                dispatch(setUserData({ id, name, email, avatar }));
                dispatch(setIsLoggedIn({ value: true }));
            })
            .catch((e) => {
                const err = e.response
                    ? e.response.data.error
                    : e.message + ", more details in the console";
                dispatch(setAppMessage({ text: err, severity: "error" }));
            })
            .finally(() => dispatch(setIsFetching(false)));
    };

export const logOutTC = () => (dispatch: TAppDispatch) => {
    dispatch(setIsFetching(true));
    authAPI
        .logOut()
        .then(() => dispatch(setIsLoggedIn({ value: false })))
        .catch((e) => {
            const err = e.response
                ? e.response.data.error
                : e.message + ", more details in the console";
            dispatch(setAppMessage({ text: err, severity: "error" }));
        })
        .finally(() => dispatch(setIsFetching(false)));
};

export const changeUserProfileTC =
    (data: ProfileDataType) => (dispatch: TAppDispatch) => {
        authAPI
            .changeUserProfile(data)
            .then(() => {
                dispatch(setUserProfile(data));
                dispatch(
                    setAppMessage({
                        text: "Successfully!",
                        severity: "success",
                    })
                );
            })
            .catch((e) => {
                const err = e.response
                    ? e.response.data.error
                    : e.message + ", more details in the console";
                dispatch(setAppMessage({ text: err, severity: "error" }));
            });
    };
