import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginDataType} from "../dal/api";
import {Dispatch} from "react";
import {AxiosError} from "axios";
import {TAppDispatch} from "./store/store";

export type TAuth = {
    isLoggedIn: boolean
}
const initialState: TAuth = {
    isLoggedIn: false
}


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC (state, action : PayloadAction<{value : boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer

export const  {setIsLoggedInAC} = slice.actions

// export type TAuthActions = {}




export const loginTC = (data : LoginDataType) => (dispatch: TAppDispatch) => {
    authAPI.login(data)
        .then(res => {
            console.log(res)
            dispatch(setIsLoggedInAC({value: true}))
            // dispatch()
        })
        .catch( (e:AxiosError) => {
            console.log(e)
        })
}