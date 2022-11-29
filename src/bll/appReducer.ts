import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TRequestStatus = "idle" | "loading" | "succeeded" | "failed";
export type TThemes = "light" | "dark";

type TAppMessage = {
    id: string;
    severity: "error" | "success";
    text: string;
};

export type TApp = {
    isInitialized: boolean;
    status: TRequestStatus;
    messages: TAppMessage[];
    isFetching: boolean;
    currentTheme: TThemes;
};
const slice = createSlice({
    name: "app",
    initialState: {
        isInitialized: false,
        status: "idle",
        messages: [],
        isFetching: false,
        currentTheme: "light",
    } as TApp,
    reducers: {
        setIsInitialized(state, action: PayloadAction<boolean>) {
            state.isInitialized = action.payload;
        },
        setAppMessage(state, action: PayloadAction<{ text: string; severity: "error" | "success" }>) {
            const newMessage: TAppMessage = {
                id: String(Math.random()),
                severity: action.payload.severity,
                text: action.payload.text,
            };
            state.messages.push(newMessage);
        },
        setAppLastMessage(state) {
            state.messages = state.messages.splice(0, state.messages.length - 1);
        },
        hideAppMessage(state, action: PayloadAction<string>) {
            state.messages = state.messages.filter((el) => el.id !== action.payload);
        },
        setAppStatus(state, action: PayloadAction<TRequestStatus>) {
            state.status = action.payload;
        },
        setIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload;
        },
        setCurrentTheme(state, action: PayloadAction<TThemes>) {
            state.currentTheme = action.payload;
        },
    },
});

export const setThemeFromLS = createAsyncThunk("app/setTheme", (param: TThemes, { dispatch }) => {
    localStorage.setItem("app-theme", param);
    dispatch(setCurrentTheme(param));
});

export const appReducer = slice.reducer;

export const {
    setIsFetching,
    setIsInitialized,
    setAppMessage,
    setAppLastMessage,
    hideAppMessage,
    setAppStatus,
    setCurrentTheme,
} = slice.actions;
