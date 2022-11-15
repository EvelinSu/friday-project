import axios from "axios";

export const instance = axios.create({
    // baseURL: "http://localhost:7542/2.0/",
    baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' :
    // 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const authAPI = {
    login(data: LoginDataType) {
        return instance.post("auth/login", data);
    },
    authMe() {
        return instance.post("auth/me", {});
    },
    logOut() {
        return instance.delete("auth/me");
    },
    changeUserProfile(data: ProfileDataType) {
        return instance.put("auth/me", data);
    },
};

export const registrationAPI = {
    register(data: RegisterDataType) {
        return instance.post("auth/register", data);
    },
};

export const forgotPassAPI = {
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

export const packsAPI = {
    getPacks(page: number, pageCount: number, userId?: string) {
        return instance.get<TResponsePack>(
            `cards/pack?page=${page}&pageCount=${pageCount}${
                userId ? "&user_id=" + userId : ""
            }`
        );
    },
};

////////////////////////////////// types ///////////////////////////

export type TPack = {
    _id: string;
    cardsCount: number;
    created: string;
    grade: number;
    more_id: string;
    path: string;
    name: string;
    private: boolean;
    rating: number;
    shots: number;
    updated: string;
    user_id: string;
    user_name: string;
};

type TResponsePack = {
    cardPacks: TPack[];
    cardPacksTotalCount: number;
    pageCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
};

export type RegisterDataType = {
    email: string;
    password: string;
};
// Данные, отправляемые на сервер при логинизации
export type LoginDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

// Смена имени и аватара
export type ProfileDataType = {
    avatar?: string;
    name?: string;
};

// ответ при не верном введении логина или пароля
export type ResponseType = {
    email: string;
    error: string;
    in: string;
};

// ответ сервера при верном log/pass,
// Ниже закомментированные не нужные данные, о которых нам вчера говорил Валера

export type ResponseTypeLogin = {
    _id: string;
    email: string;
    rememberMe: boolean;
    name: string;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    // isAdmin: boolean
    // verified: boolean
    // __v: number
    // token: string
    // tokenDeathTime: number
};

// ответ с сервера при отсутствии авториз. куки у юзера
export type ResponseNotAuth = {
    error: string;
    in: string;
};
