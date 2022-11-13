import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {forgotPassAPI} from "../dal/api";
import {AxiosError} from "axios";
import {TAppDispatch} from "./store/store";
import {setAppError} from "./appReducer";
import {setIsFetching} from "./authReducer";


export type TForgotPass = {
    isSending : boolean
    token: string | null
}
const initialState: TForgotPass = {
    isSending : false,
    token: null
}

const slice = createSlice({
    name: 'password',
    initialState: initialState,
    reducers: {
        setStatusSendAC(state, action: PayloadAction<{ send: boolean}>) {
            state.isSending = action.payload.send
        },
        setTokenAC(state, action:PayloadAction<{token: string}>) {
            console.log(action.payload.token)
            state.token = action.payload.token
        }
        // setIsRegisteredAC(state, action: PayloadAction<{ isRegistered: boolean }>) {
        //     state.isRegistered = action.payload.isRegistered
        // }
    }
})

export const forgotPassReducer = slice.reducer

export const {setStatusSendAC,setTokenAC} = slice.actions


export const sendEmailTC = (email: string) => (dispatch: TAppDispatch) => {
    dispatch(setIsFetching(false))
    forgotPassAPI.sendEmail(email)
        .then(() => {
            // dispatch(setRegisterUserAC(data));
            dispatch(setStatusSendAC({send : true}))
        })
       .catch((e: AxiosError) => dispatch(setAppError(e.message)))
       .finally(() => dispatch(setIsFetching(false)))
}