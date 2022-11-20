import { instance } from "./instance";
import {
    TLoginData,
    TProfileData,
    TRegisterData,
    TResponseChangeUserProfile,
    TResponseSendEmail,
    TResponseUserData,
    TSendPassData,
} from "./ResponseTypes";
import { AxiosResponse } from "axios";

export const authAPI = {
    login(data: TLoginData) {
        return instance.post<TLoginData, AxiosResponse<TResponseUserData>>("auth/login", data);
    },
    authMe() {
        return instance.post<{}, AxiosResponse<TResponseUserData>>("auth/me");
    },
    logOut() {
        return instance.delete<{ info: string }>("auth/me");
    },
    changeUserProfile(data: TProfileData) {
        return instance.put<TProfileData, AxiosResponse<TResponseChangeUserProfile>>("auth/me", data);
    },
    register(data: TRegisterData) {
        return instance.post<TRegisterData, AxiosResponse<{ addedUser: TResponseUserData }>>(
            "auth/register",
            data
        );
    },
    sendEmail(email: string) {
        return instance.post<{ email: string }, AxiosResponse<TResponseSendEmail>>("auth/forgot", {
            email: email,
            from: "app Cards",
            message: `<div style="background-color: #3b3b49; color: white; padding: 15px">
                password recovery link: 
                <a  href="https://evelinsu.github.io/friday-project/#/login/changePassword/$token$"  style=" color: deepskyblue">
                link</a></div>`,
        });
    },
    sendNewPass(data: TSendPassData) {
        return instance.post<TSendPassData, AxiosResponse<{ info: string }>>(
            "auth/set-new-password",
            data
        );
    },
};
