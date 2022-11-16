import thunk, { ThunkDispatch } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../authReducer";
import { appReducer } from "../appReducer";
import { registerReducer } from "../registerReducer";
import { forgotPassReducer } from "../forgotPassReducer";
import { packsReducer } from "../packsReducer";
import { packsParamsReducer } from "../packsParamsReducer";
import { AppActionsTypes } from "../../common/types/ActionsTypes";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        packs: packsReducer,
        packsParams: packsParamsReducer,
        registration: registerReducer,
        forgotPass: forgotPassReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type TRootState = ReturnType<typeof store.getState>;

// export type TAppDispatch = typeof store.dispatch;
export type TAppDispatch = ThunkDispatch<TRootState, unknown, AppActionsTypes>;

// @ts-ignore
window.store = store;
