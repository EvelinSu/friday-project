import axios from "axios";

export const hi = "hi"


export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // process.env.REACT_APP_BACK_URL ||
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginDataType) {
        return instance.post('auth/login', data
            // {email: "laif17860@mail.ru",
            // password: "admin123"}
        )
    }
}


export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}


export type ResponseType = {
    email: string
    error: string
    in: string
}

export type ResponseTypeLuk = {
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
