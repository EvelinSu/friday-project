import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../authReducer";
import { appReducer } from "../appReducer";
import { registerReducer } from "../registerReducer";
import { forgotPassReducer } from "../forgotPassReducer";
import { packsReducer } from "../packsReducer";
import { packsParamsReducer } from "../packsParamsReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        packs: packsReducer,
        registration: registerReducer,
        forgotPass: forgotPassReducer,
        packsParams: packsParamsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware),
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;
