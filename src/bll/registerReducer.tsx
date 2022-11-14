import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterDataType, registrationAPI } from "../dal/api";
import { TAppDispatch } from "./store/store";
import { setIsFetching } from "./authReducer";
import { setAppMessage } from "./appReducer";

export type TRegister = {
    email: string;
    isRegistered: boolean;
};
const initialState: TRegister = {
    email: "",
    isRegistered: false,
};

const slice = createSlice({
    name: "register",
    initialState: initialState,
    reducers: {
        setRegisterUserAC(state, action: PayloadAction<{ email: string }>) {
            state.email = action.payload.email;
        },
        setIsRegisteredAC(
            state,
            action: PayloadAction<{ isRegistered: boolean }>
        ) {
            state.isRegistered = action.payload.isRegistered;
        },
    },
});

export const registerReducer = slice.reducer;

export const { setRegisterUserAC, setIsRegisteredAC } = slice.actions;

export const registerTC =
    (data: RegisterDataType) => (dispatch: TAppDispatch) => {
        dispatch(setIsFetching(true));
        registrationAPI
            .register(data)
            .then(() => {
                dispatch(setRegisterUserAC(data));
                dispatch(setIsRegisteredAC({ isRegistered: true }));
                dispatch(
                    setAppMessage({
                        text: "Registration was successful!",
                        severity: "success",
                    })
                );
            })
            .catch((e) => {
                const err = e.response
                    ? e.response.data.error
                    : e.message + ", more details in the console";
                dispatch(setAppMessage({ text: err, severity: "error" }));
            })
            .finally(() => dispatch(setIsFetching(false)));
    };
