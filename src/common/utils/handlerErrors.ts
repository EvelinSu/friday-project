import axios, { AxiosError } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { setAppMessage } from "../../bll/appReducer";

export const handlerErrors = (dispatch: Dispatch, e: unknown) => {
    const err = e as Error | AxiosError;
    if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data ? err.response.data : err;
        dispatch(setAppMessage({ text: errorMessage.error, severity: "error" }));
        return;
    }
    dispatch(setAppMessage({ text: err.message, severity: "error" }));
};
