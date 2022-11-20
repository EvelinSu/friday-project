import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../dal/authAPI";
import { TAppDispatch } from "./store/store";
import { setAppMessage, setIsFetching } from "./appReducer";
import axios, { AxiosError } from "axios";

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

export const sendEmailTC = createAsyncThunk(
    "password/sendEmailTC",
    async (email: string, { dispatch }) => {
        dispatch(setIsFetching(true));
        try {
            await authAPI.sendEmail(email);
            dispatch(setStatusSendAC({ isSendLetter: true }));
            dispatch(setAppMessage({ text: "Check your email!", severity: "success" }));
        } catch (e) {
            const err = e as Error | AxiosError;
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data ? err.response.data : err;
                dispatch(setAppMessage({ text: errorMessage.error, severity: "error" }));
            }
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export const sendNewPassTC =
    (password: string, resetPasswordToken: string) => (dispatch: TAppDispatch) => {
        dispatch(setIsFetching(true));
        authAPI
            .sendNewPass({ password, resetPasswordToken })
            .then(() => dispatch(setTokenAC({ token: "" })))
            .catch((e) => {
                const err = e.response
                    ? e.response.data.error
                    : e.message + ", more details in the console";
                dispatch(setAppMessage({ text: err, severity: "error" }));
            })
            .finally(() => dispatch(setIsFetching(false)));
    };

export const forgotPassReducer = slice.reducer;
export const { setStatusSendAC, setTokenAC } = slice.actions;
