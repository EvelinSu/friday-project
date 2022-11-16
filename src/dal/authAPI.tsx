import { instance } from "./instance";
import {
    LoginDataType,
    ProfileDataType,
    RegisterDataType,
} from "./ResponseTypes";

export const authAPI = {
    login(data: LoginDataType) {
        return instance.post("auth/login", data);
    },
    authMe() {
        return instance.post("auth/me");
    },
    logOut() {
        return instance.delete("auth/me");
    },
    changeUserProfile(data: ProfileDataType) {
        return instance.put("auth/me", data);
    },
    register(data: RegisterDataType) {
        return instance.post("auth/register", data);
    },
    sendEmail(email: string) {
        return instance.post("auth/forgot", {
            email: email,
            from: "app Cards",
            message: `<div style="background-color: #3b3b49; color: white; padding: 15px">
                password recovery link: 
                <a  href="https://evelinsu.github.io/friday-project/#/login/changePassword/$token$"  style=" color: deepskyblue">
                link</a></div>`,
        });
    },
    sendNewPass(pass: string, token: string) {
        return instance.post("auth/set-new-password", {
            password: pass,
            resetPasswordToken: token,
        });
    },
};
