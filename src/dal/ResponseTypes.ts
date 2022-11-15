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

export type TResponsePack = {
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
