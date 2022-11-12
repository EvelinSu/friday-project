import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../dal/api";
import {AxiosError} from "axios";
import {TAppDispatch} from "./store/store";

export type TAuth = {
    isInitialized: boolean
}
const initialState: TAuth = {

    isInitialized: false
}


const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setIsInitialized(state, action: PayloadAction<{ value: boolean }>) {

        }
    }
})

export const appReducer = slice.reducer

export const  {setIsInitialized} = slice.actions



export const authMeTC = () => (dispatch: TAppDispatch) => {
    authAPI.authMe()
        .then(res => {
            console.log(res)
            dispatch(setIsInitialized({value: true}))
        })
        .catch( (e:AxiosError) => {
            console.log(e)
        })
}