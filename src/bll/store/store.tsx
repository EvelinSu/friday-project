import thunkMiddleware from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../authReducer";
import {appReducer} from "../appReducer";


export const store = configureStore({
    reducer: {
        auth : authReducer,
        app : appReducer
    },
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware)
})


export type TRootState = ReturnType<typeof store.getState>

export type TAppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;