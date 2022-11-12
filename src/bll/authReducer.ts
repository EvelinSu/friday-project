import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginDataType} from "../dal/api";
import {AxiosError} from "axios";
import {TAppDispatch} from "./store/store";

export type TAuth = {
    userData : {
        id: string | null
        name : string | null
        email : string | null
        avatar? : string | null
    }

    isLoggedIn: boolean
}
const initialState: TAuth = {
    userData : {
        id : null,
        name : null,
        email : null,
        avatar: null
    },
    isLoggedIn: false
}


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC (state, action : PayloadAction<{value : boolean}>) {
            state.isLoggedIn = action.payload.value
        },
        setUserDataAC (state, action : PayloadAction<{id: string, name: string, email: string}>) {
            console.log(action.payload)
            state.userData = action.payload
        }
    }
})

export const authReducer = slice.reducer

export const  {setIsLoggedInAC,setUserDataAC} = slice.actions



export const loginTC = (data : LoginDataType) => (dispatch: TAppDispatch) => {
    authAPI.login(data)
        .then(res => {
            console.log(res)
            const {name, email} = res.data
            const id = res.data._id
            dispatch(setUserDataAC({id, name, email}))
            dispatch(setIsLoggedInAC({value: true}))
        })
        .catch( (e:AxiosError) => {
            console.log(e)
        })
}



export const logOutTC = () =>  (dispatch : TAppDispatch) => {
    authAPI.logOut()
        .then(() => {
            dispatch(setIsLoggedInAC({value :false}))
        })
        .catch((e : AxiosError) => {
            console.log(e)
    })

}