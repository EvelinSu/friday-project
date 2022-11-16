import {
    hideAppMessage,
    setAppLastMessage,
    setAppMessage,
    setAppStatus,
    setIsInitialized,
} from "../../bll/appReducer";
import { setIsFetching, setIsLoggedIn, setUserData, setUserProfile } from "../../bll/authReducer";
import { setStatusSendAC, setTokenAC } from "../../bll/forgotPassReducer";
import { setCardParams } from "../../bll/packsParamsReducer";
import { clearStatePacks, setPacks } from "../../bll/packsReducer";
import { setIsRegisteredAC, setRegisterUserAC } from "../../bll/registerReducer";

export type AppActionsTypes =
    | ReturnType<typeof setIsInitialized>
    | ReturnType<typeof setAppMessage>
    | ReturnType<typeof setAppLastMessage>
    | ReturnType<typeof hideAppMessage>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof setStatusSendAC>
    | ReturnType<typeof setTokenAC>
    | ReturnType<typeof setCardParams>
    | ReturnType<typeof setPacks>
    | ReturnType<typeof clearStatePacks>
    | ReturnType<typeof setRegisterUserAC>
    | ReturnType<typeof setIsRegisteredAC>;
