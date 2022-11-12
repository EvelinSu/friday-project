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


export type AppRootStateType = ReturnType<typeof store.getState>

// hook
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;