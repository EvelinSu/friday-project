import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../dal/api";
import {AxiosError} from "axios";
import {TAppDispatch} from "./store/store";
import {setIsLoggedInAC} from "./authReducer";

export type TApp = {
    isInitialized: boolean
    errors: string[]
}
const initialState: TApp = {
    isInitialized: false,
    errors: ['Some errorSome errorSome errorSome errorSome errorSome errorSome error', 'Some error']
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setIsInitialized(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        },
        setAppError(state, action: PayloadAction<string | string[]>) {
            if(typeof action.payload === "string") state.errors.push(action.payload)
            else state.errors = action.payload
        },
    },

})

export const appReducer = slice.reducer
export const {setIsInitialized, setAppError} = slice.actions

export const authMeTC = () => (dispatch: TAppDispatch) => {
    authAPI.authMe()
           .then(() => {
               dispatch(setIsLoggedInAC({value: true}))
               dispatch(setIsInitialized({value: true}))
           })
           .catch((e: AxiosError) => {
               console.log(e)
           })
}