import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginDataType} from "../dal/api";
import {AxiosError} from "axios";
import {TAppDispatch} from "./store/store";
import {setAppError} from "./appReducer";

export type TAuth = {
    userData: {
        id: string | null
        name: string | null
        email: string | null
        avatar?: string | null
    }
    isLoggedIn: boolean
}
const initialState: TAuth = {
    userData: {
        id: null,
        name: null,
        email: null,
        avatar: null
    },
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        },
        setUserData(state, action: PayloadAction<{ id: string, name: string, email: string }>) {
            state.userData = action.payload
        }
    }
})

export const authReducer = slice.reducer

export const {setIsLoggedIn, setUserData} = slice.actions

export const loginTC = (data: LoginDataType) => (dispatch: TAppDispatch) => {
    authAPI.login(data)
           .then(res => {
               const {name, email} = res.data
               const id = res.data._id
               dispatch(setUserData({id, name, email}))
               dispatch(setIsLoggedIn({value: true}))
           })
           .catch((e: AxiosError) => {
               dispatch(setAppError(e.message))
           })
}

export const logOutTC = () => (dispatch: TAppDispatch) => {
    authAPI.logOut()
           .then(() => {
               dispatch(setIsLoggedIn({value: false}))
           })
           .catch((e: AxiosError) => {
               dispatch(setAppError(e.message))
           })

}