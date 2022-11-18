import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../authReducer";
import { appReducer } from "../appReducer";
import { forgotPassReducer } from "../forgotPassReducer";
import { packsReducer } from "../packsReducer";
import { packsParamsReducer } from "../packsParamsReducer";
import thunkMiddleware from "redux-thunk";
import { userReducer } from "../userReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        packs: packsReducer,
        packsParams: packsParamsReducer,
        forgotPass: forgotPassReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export default store;
