import {createSlice} from "@reduxjs/toolkit";

export type TAuth = {}
const initialState: TAuth = {}


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {}
})

export const authReducer = slice.reducer



// export type TAuthActions = {}


