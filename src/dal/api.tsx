import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // process.env.REACT_APP_BACK_URL ||
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginDataType) {
        return instance.post('auth/login', data
        )
    },
    authMe () {
        return instance.post('auth/me', {})
    },
    logOut () {
        return instance.delete('auth/me')
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




// "_id": "636f48b50bef0f1d4ed6cc56",
//     "email": "laif17860@mail.ru",
//     "rememberMe": false,
//     "isAdmin": false,
//     "name": "laif17860@mail.ru",
//     "verified": false,
//     "publicCardPacksCount": 0,
//     "created": "2022-11-12T07:18:13.818Z",
//     "updated": "2022-11-12T09:49:14.372Z",
//     "__v": 0,
//     "token": "44374c40-626f-11ed-8731-91861a92951a",
//     "tokenDeathTime": 1668257354372


// {
//     "error": "you are not authorized /ᐠ-ꞈ-ᐟ\\",
//     "in": "getMe/findUserByToken/User.findOne"
// }