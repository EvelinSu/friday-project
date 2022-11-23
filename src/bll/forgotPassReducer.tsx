import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../dal/authAPI";
import { setAppMessage, setIsFetching } from "./appReducer";
import { handlerErrors } from "../common/utils/handlerErrors";

export type TForgotPass = {
    isSendLetter: boolean;
    token: string;
};

export const sendEmailTC = createAsyncThunk(
    "password/sendEmail",
    async (email: string, { dispatch, rejectWithValue }) => {
        dispatch(setIsFetching(true));
        try {
            await authAPI.sendEmail(email);
            dispatch(setAppMessage({ text: "Check your email!", severity: "success" }));
            return;
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export const sendNewPassTC = createAsyncThunk(
    "password/sendNewPass",
    async (param: { password: string; resetPasswordToken: string }, { dispatch, rejectWithValue }) => {
        dispatch(setIsFetching(true));
        const { password, resetPasswordToken } = param;
        try {
            await authAPI.sendNewPass({ password, resetPasswordToken });
            dispatch(setTokenAC({ token: "" }));
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

const slice = createSlice({
    name: "password",
    initialState: {
        isSendLetter: false,
        token: "waitToken",
    } as TForgotPass,
    reducers: {
        setTokenAC(state, action: PayloadAction<{ token: string }>) {
            state.token = action.payload.token;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendEmailTC.fulfilled, (state) => {
            state.isSendLetter = true;
        });
    },
});

export const forgotPassReducer = slice.reducer;
export const { setTokenAC } = slice.actions;
