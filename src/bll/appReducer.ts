import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../dal/api";
import {AxiosError} from "axios";
import {TAppDispatch} from "./store/store";
import {setIsLoggedIn} from "./authReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


export type TApp = {
    isInitialized: boolean
    status: RequestStatusType,
    errors: string[]
}
const initialState: TApp = {
    isInitialized: false,
    status: 'idle',
    errors: []
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
        setAppLastError(state) {
            state.errors = state.errors.splice(0, state.errors.length - 1)
        },
        setAppStatus(state, action: PayloadAction<RequestStatusType>) {
            state.status = action.payload
        },
    },

})

export const appReducer = slice.reducer
export const {setIsInitialized, setAppError, setAppLastError, setAppStatus} = slice.actions

export const authMeTC = () => (dispatch: TAppDispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.authMe()
           .then(() => {
               dispatch(setIsLoggedIn({value: true}))
               dispatch(setIsInitialized({value: true}))
           })
           .catch((e: AxiosError) => {
               dispatch(setIsLoggedIn({value: true}))
               dispatch(setAppError(e.message))
           })
}