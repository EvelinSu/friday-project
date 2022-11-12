import thunkMiddleware from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../authReducer";


export const store = configureStore({
    reducer: {
        auth : authReducer
    },
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware)
})


export type TRootState = ReturnType<typeof store.getState>

export type TAppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;