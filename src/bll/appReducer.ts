import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../dal/api";
import {AxiosError} from "axios";
import {TAppDispatch} from "./store/store";
import {setIsLoggedInAC} from "./authReducer";

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
            state.isInitialized = action.payload.value
        }
    },

})

export const appReducer = slice.reducer
export const  {setIsInitialized} = slice.actions



export const authMeTC = () => (dispatch: TAppDispatch) => {
    authAPI.authMe()
        .then(() => {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setIsInitialized({value: true}))
        })
        .catch( (e:AxiosError) => {
            console.log(e)
        })
}