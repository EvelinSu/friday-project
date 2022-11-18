import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../dal/authAPI";
import { TAppDispatch } from "./store/store";
import { setAppMessage, setIsFetching } from "./appReducer";

export type TForgotPass = {
    isSendLetter: boolean;
    token: string;
};
const initialState: TForgotPass = {
    isSendLetter: false,
    token: "waitToken",
};

const slice = createSlice({
    name: "password",
    initialState: initialState,
    reducers: {
        setStatusSendAC(state, action: PayloadAction<{ isSendLetter: boolean }>) {
            state.isSendLetter = action.payload.isSendLetter;
        },
        setTokenAC(state, action: PayloadAction<{ token: string }>) {
            state.token = action.payload.token;
        },
    },
});

export const sendEmailTC = (email: string) => (dispatch: TAppDispatch) => {
    dispatch(setIsFetching(true));
    authAPI
        .sendEmail(email)
        .then(() => {
            dispatch(setStatusSendAC({ isSendLetter: true }));
            dispatch(setAppMessage({ text: "Check your email!", severity: "success" }));
        })
        .catch((e) => {
            const err = e.response ? e.response.data.error : e.message + ", more details in the console";
            dispatch(setAppMessage({ text: err, severity: "error" }));
        })
        .finally(() => dispatch(setIsFetching(false)));
};

export const sendNewPassTC = (password: string, token: string) => (dispatch: TAppDispatch) => {
    dispatch(setIsFetching(true));
    authAPI
        .sendNewPass(password, token)
        .then(() => dispatch(setTokenAC({ token: "" })))
        .catch((e) => {
            const err = e.response ? e.response.data.error : e.message + ", more details in the console";
            dispatch(setAppMessage({ text: err, severity: "error" }));
        })
        .finally(() => dispatch(setIsFetching(false)));
};

export const forgotPassReducer = slice.reducer;
export const { setStatusSendAC, setTokenAC } = slice.actions;
