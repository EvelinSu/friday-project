import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAppDispatch } from "./store/store";
import { setIsFetching } from "./authReducer";
import { RegisterDataType } from "../dal/ResponseTypes";
import { authAPI } from "../dal/authAPI";
import { setAppMessage } from "./appReducer";

export type TRegister = {
    email: string;
};
const initialState: TRegister = {
    email: "",
};

const slice = createSlice({
    name: "register",
    initialState: initialState,
    reducers: {
        setRegisterUserAC(state, action: PayloadAction<{ email: string }>) {
            state.email = action.payload.email;
        },
    },
});

export const registerReducer = slice.reducer;

export const { setRegisterUserAC } = slice.actions;

export const registerTC = (data: RegisterDataType) => async (dispatch: TAppDispatch) => {
    dispatch(setIsFetching(true));
    authAPI
        .register(data)
        .then(() => {
            dispatch(setRegisterUserAC(data));
            dispatch(setAppMessage({ text: "Registration was successful!", severity: "success" }));
        })
        .catch((e) => {
            const err = e.response ? e.response.data.error : e.message + ", more details in the console";
            dispatch(setAppMessage({ text: err, severity: "error" }));
        })
        .finally(() => dispatch(setIsFetching(false)));
};
