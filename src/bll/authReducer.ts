import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../dal/authAPI";
import { setAppMessage, setAppStatus, setIsFetching, setIsInitialized } from "./appReducer";
import { TLoginData, TProfileData, TRegisterData } from "../dal/ResponseTypes";
import { clearStatePacks } from "./packsReducer";
import { handlerErrors } from "../common/utils/handlerErrors";

type TUserData = {
    id: string | null;
    name: string | null;
    email: string | null;
    avatar?: string | null;
};

export type TAuth = {
    userData: TUserData;
    registerData: TRegisterData;
    isLoggedIn: boolean;
};

export const registerTC = createAsyncThunk(
    "auth/register",
    async (param: TRegisterData, { dispatch, rejectWithValue }) => {
        dispatch(setIsFetching(true));
        try {
            await authAPI.register(param);
            dispatch(setRegisterUserData(param));
            dispatch(setAppMessage({ text: "Registration was successful!", severity: "success" }));
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export const authMeTC = createAsyncThunk("auth/authMe", async (param, { dispatch, rejectWithValue }) => {
    try {
        dispatch(setIsInitialized({ value: false }));
        dispatch(setAppStatus("loading"));
        const me = await authAPI.authMe();
        const { name, email, avatar } = me.data;
        const id = me.data._id;
        await dispatch(setUserData({ id, name, email, avatar }));
        dispatch(setIsLoggedIn({ value: true }));
    } catch (e) {
        dispatch(setIsLoggedIn({ value: false }));
        return rejectWithValue({});
    } finally {
        dispatch(setIsInitialized({ value: true }));
    }
});

export const loginTC = createAsyncThunk(
    "auth/loginTC",
    async (data: TLoginData, { dispatch, rejectWithValue }) => {
        dispatch(setIsFetching(true));

        try {
            const res = await authAPI.login(data);
            const { name, email, avatar } = res.data;
            const id = res.data._id;
            dispatch(setUserData({ id, name, email, avatar }));
            dispatch(setIsLoggedIn({ value: true }));
            dispatch(setRegisterUserData({ email: "", password: "" }));
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export const logOutTC = createAsyncThunk("auth,logOut", async (param, { dispatch, rejectWithValue }) => {
    dispatch(setIsFetching(true));
    try {
        await authAPI.logOut();
        dispatch(clearStatePacks());
        dispatch(setIsLoggedIn({ value: false }));
    } catch (e) {
        handlerErrors(dispatch, e);
        return rejectWithValue({});
    } finally {
        dispatch(setIsFetching(false));
    }
});

export const changeUserProfileTC = createAsyncThunk(
    "auth/changeUserProfile",

    async (data: TProfileData, { dispatch, rejectWithValue }) => {
        dispatch(setIsFetching(true));

        try {
            await authAPI.changeUserProfile(data);
            dispatch(setAppMessage({ text: "Successfully!", severity: "success" }));
            return data;
        } catch (e) {
            // Add check size img
            // if (e.request.status === 413) {
            //     dispatch(setAppMessage({ text: e.response.statusText, severity: "error" }));

            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

const slice = createSlice({
    name: "auth",
    initialState: {
        userData: {
            id: null,
            name: null,
            email: null,
            avatar: null,
        },
        registerData: {
            email: "",
            password: "",
        },
        isLoggedIn: false,
    } as TAuth,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        },
        setUserData(state, action: PayloadAction<TUserData>) {
            state.userData = action.payload;
        },
        setRegisterUserData(state, action: PayloadAction<TRegisterData>) {
            state.registerData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(changeUserProfileTC.fulfilled, (state, action) => {
            if (action.payload?.avatar) state.userData.avatar = action.payload.avatar;
            if (action.payload?.name) state.userData.name = action.payload.name;
        });
    },
});

export const { setIsLoggedIn, setUserData, setRegisterUserData } = slice.actions;

export const authReducer = slice.reducer;
