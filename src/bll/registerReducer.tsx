import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RegisterDataType, registrationAPI} from "../dal/api";
import {AxiosError} from "axios";
import {TAppDispatch} from "./store/store";
import {setAppError} from "./appReducer";
import {setIsFetching} from "./authReducer";


export type TRegister = {
    email: string
    isRegistered: boolean
}
const initialState: TRegister = {
    email: "",
    isRegistered: false
}

const slice = createSlice({
    name: 'register',
    initialState: initialState,
    reducers: {
        setRegisterUserAC(state, action: PayloadAction<{ email: string}>) {
            state.email = action.payload.email
        },
        setIsRegisteredAC(state, action: PayloadAction<{ isRegistered: boolean }>) {
            state.isRegistered = action.payload.isRegistered
        }
    }
})

export const registerReducer = slice.reducer

export const {setRegisterUserAC, setIsRegisteredAC} = slice.actions


export const registerTC = (data: RegisterDataType) => (dispatch: TAppDispatch) => {
    dispatch(setIsFetching(false))
    registrationAPI.register(data)
        .then(() => {
            dispatch(setRegisterUserAC(data));
            dispatch(setIsRegisteredAC({isRegistered: true}))
        })
       .catch((e: AxiosError) => dispatch(setAppError(e.message)))
       .finally(() => dispatch(setIsFetching(false)))
}