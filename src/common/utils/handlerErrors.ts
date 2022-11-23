import axios, { AxiosError } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { setAppMessage } from "../../bll/appReducer";

export const handlerErrors = (dispatch: Dispatch, e: unknown) => {
    const err = e as Error | AxiosError;
    if (axios.isAxiosError(err)) {
        console.log(err);

        const errorMessage = err.response?.data
            ? err.response.data
            : err.message + ", more details in the console";
        dispatch(setAppMessage({ text: errorMessage, severity: "error" }));
        return;
    }
    const errNetwork = `${err.message}, more details in the console`;
    dispatch(setAppMessage({ text: errNetwork, severity: "error" }));
};
