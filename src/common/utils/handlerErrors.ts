import axios, { AxiosError } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { setAppMessage } from "../../bll/appReducer";

export const handlerErrors = (dispatch: Dispatch, e: unknown) => {
    const err = e as Error | AxiosError;
    if (axios.isAxiosError(err)) {
        if (err.request.status !== 413) {
            const errorMessage = err.response?.data
                ? err.response.data
                : err.message + ", more details in the console";
            dispatch(setAppMessage({ text: errorMessage, severity: "error" }));
        } else {
            dispatch(
                setAppMessage({
                    text: "The image was not uploaded.Try other images ",
                    severity: "error",
                })
            );
        }
        return;
    }
    const errNetwork = `${err.message}, more details in the console`;
    dispatch(setAppMessage({ text: errNetwork, severity: "error" }));
};
