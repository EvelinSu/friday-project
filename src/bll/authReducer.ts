import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../dal/authAPI";
import {setAppMessage, setIsFetching, setIsInitialized} from "./appReducer";
import {TLoginData, TProfileData, TRegisterData} from "../dal/ResponseTypes";
import {clearStatePacks} from "./packsReducer";
import {handlerErrors} from "../common/utils/handlerErrors";

export const registerTC = createAsyncThunk(
    "auth/register",
    async (param: TRegisterData, {dispatch}) => {
        dispatch(setIsFetching(true));
        try {
            await authAPI.register(param);
            dispatch(setRegisterUserData(param));
            dispatch(setAppMessage({text: "Registration was successful!", severity: "success"}));
            return true;
        } catch (e) {
            handlerErrors(dispatch, e);
            return false;
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export const authMeTC = createAsyncThunk("auth/authMe", async (param, {dispatch, rejectWithValue}) => {
    try {
        const me = await authAPI.authMe();
        const {name, email, avatar} = me.data;
        const id = me.data._id;
        dispatch(setIsInitialized(false));
        await dispatch(setUserData({id, name, email, avatar}));
        dispatch(setIsLoggedIn(true));
    } catch (e) {
        dispatch(setIsLoggedIn(false));
        return rejectWithValue({});
    } finally {
        dispatch(setIsInitialized(true));
    }
});

export const loginTC = createAsyncThunk(
    "auth/loginTC",
    async (data: TLoginData, {dispatch, rejectWithValue}) => {
        dispatch(setIsFetching(true));
        try {
            const res = await authAPI.login(data);
            const {name, email, avatar} = res.data;
            const id = res.data._id;
            dispatch(setUserData({id, name, email, avatar}));
            dispatch(setIsLoggedIn(true));
            dispatch(setRegisterUserData({email: "", password: ""}));
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export const logOutTC = createAsyncThunk("auth,logOut", async (param, {dispatch, rejectWithValue}) => {
    dispatch(setIsFetching(true));
    try {
        await authAPI.logOut();
        dispatch(clearStatePacks());
        dispatch(setIsLoggedIn(false));
    } catch (e) {
        handlerErrors(dispatch, e);
        return rejectWithValue({});
    } finally {
        dispatch(setIsFetching(false));
    }
});

export const changeUserProfileTC = createAsyncThunk(
    "auth/changeUserProfile",
    async (data: TProfileData, {dispatch, rejectWithValue}) => {
        dispatch(setIsFetching(true));
        try {
            await authAPI.changeUserProfile(data);
            dispatch(setAppMessage({text: "Successfully!", severity: "success"}));
            return data;
        } catch (e) {
            handlerErrors(dispatch, e);
            return rejectWithValue({});
        } finally {
            dispatch(setIsFetching(false));
        }
    }
);

export type TAuthState = {
    myData: TMyData;
    registerData: TRegisterData;
    isLoggedIn: boolean;
};
const slice = createSlice({
    name: "auth",
    initialState: {
        myData: {
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
    } as TAuthState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
        setUserData(state, action: PayloadAction<TMyData>) {
            state.myData = action.payload;
        },
        setRegisterUserData(state, action: PayloadAction<TRegisterData>) {
            state.registerData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(changeUserProfileTC.fulfilled, (state, action) => {
            if (action.payload?.avatar) state.myData.avatar = action.payload.avatar;
            if (action.payload?.name) state.myData.name = action.payload.name;
        });
    },
});

type TMyData = {
    id: string | null;
    name: string | null;
    email: string | null;
    avatar?: string | null;
};

export const {setIsLoggedIn, setUserData, setRegisterUserData} = slice.actions;
export const authReducer = slice.reducer;
