import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // process.env.REACT_APP_BACK_URL ||
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginDataType) {
        return instance.post('auth/login', data)
    },
    authMe() {
        return instance.post('auth/me', {})
    },
    logOut() {
        return instance.delete('auth/me')
    },
    changeUserProfile(data: ProfileDataType) {
        return instance.put('auth/me', data)
    }
}

export const registrationAPI = {
    register(data: RegisterDataType) {
        return instance.post('auth/register', data)
    }
}

export type RegisterDataType = {
    email: string
    password: string
}
// Данные, отправляемые на сервер при логинизации
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

// Смена имени и аватара
export type ProfileDataType = {
    avatar?: string,
    name?: string
}

// ответ при не верном введении логина или пароля
export type ResponseType = {
    email: string
    error: string
    in: string
}

// ответ сервера при верном log/pass,
// Ниже закомментированные не нужные данные, о которых нам вчера говорил Валера

export type ResponseTypeLogin = {
    _id: string
    email: string
    rememberMe: boolean
    name: string
    publicCardPacksCount: number
    created: string
    updated: string
    // isAdmin: boolean
    // verified: boolean
    // __v: number
    // token: string
    // tokenDeathTime: number
}


// ответ с сервера при отсутствии авториз. куки у юзера
export type ResponseNotAuth =
{
    "error": string,
    "in": string
}
