import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { forgotPassAPI } from "../dal/api";
import { TAppDispatch } from "./store/store";
import { setAppError } from "./appReducer";
import { setIsFetching } from "./authReducer";

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
        setStatusSendAC(
            state,
            action: PayloadAction<{ isSendLetter: boolean }>
        ) {
            state.isSendLetter = action.payload.isSendLetter;
        },
        setTokenAC(state, action: PayloadAction<{ token: string }>) {
            debugger;
            state.token = action.payload.token;
        },
    },
});

export const forgotPassReducer = slice.reducer;

export const { setStatusSendAC, setTokenAC } = slice.actions;

export const sendEmailTC = (email: string) => (dispatch: TAppDispatch) => {
    dispatch(setIsFetching(true));
    forgotPassAPI
        .sendEmail(email)
        .then(() => {
            dispatch(setStatusSendAC({ isSendLetter: true }));
        })
        .catch((e) => {
            const err = e.response
                ? e.response.data.error
                : e.message + ", more details in the console";
            dispatch(setAppError(err));
        })
        .finally(() => dispatch(setIsFetching(false)));
};

export const sendNewPassTC =
    (password: string, token: string) => (dispatch: TAppDispatch) => {
        dispatch(setIsFetching(true));

        forgotPassAPI
            .sendNewPass(password, token)
            .then((res) => {
                console.log(res);
                dispatch(setTokenAC({ token: "" }));
            })
            .catch((e) => {
                const err = e.response
                    ? e.response.data.error
                    : e.message + ", more details in the console";
                dispatch(setAppError(err));
            })
            .finally(() => dispatch(setIsFetching(false)));
    };
