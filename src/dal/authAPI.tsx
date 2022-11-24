import {instance} from "./instance";
import {
    TLoginData,
    TProfileData,
    TRegisterData,
    TResponseChangeUserProfile,
    TResponseSendEmail,
    TResponseUserData,
    TSendPassData,
} from "./ResponseTypes";
import {AxiosResponse} from "axios";

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
            message: `<div style="text-align: center; background-color: #fff; color: black;">
                        <p style="font-size: 26px; font-weight: 600; text-align: center; color: #4F659E;">Need to reset your password?</p>
                        <p style="opacity: 0.5; line-height: 24px; text-align: center;">Click on the button</p>
                        <div style="text-align: center">
                        <a href="https://evelinsu.github.io/friday-project/#/login/changePassword/$token$" style=" color: #fff; display: inline-block; padding: 10px 30px;  border-radius: 20px; background-color: #7398CE;  text-align: center; text-decoration: none; font-size: 16px; letter-spacing: 1px;">
                            Reset your password</a>
                        </div>
                        <p style="opacity: 0.5; line-height: 24px; text-align: center;">If you did not forget your password, you can ignore this email.</p>
                       </div>`,
        });
    },
    sendNewPass(data: TSendPassData) {
        return instance.post<TSendPassData, AxiosResponse<{ info: string }>>(
            "auth/set-new-password",
            data
        );
    },
};