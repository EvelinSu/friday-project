export type TPack = {
    _id: string;
    cardsCount: number;
    created: string;
    grade: number;
    more_id: string;
    path: string;
    name: string;
    type: string;
    private: boolean; // с сервера приходит private
    rating: number;
    shots: number;
    updated: string;
    user_id: string;
    user_name: string;
    __v: number;
    deckCover: string;
};

export type TOtherUserData = {
    _id: string;
    email: string;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    avatar: string;
};

export type TCardsPackUpdate = {
    _id: string;
    name: string;
    deckCover: string;
    private: boolean;
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

export type TPacksParams = {
    packName?: string;
    min?: string;
    max?: string;
    sortPacks?: string;
    page?: string;
    pageCount?: string;
    user_id?: string;
};

export type TNewCardsPack = {
    name: string;
    deckCover: string;
    private?: boolean;
};

export type TRegisterData = {
    email: string;
    password: string;
};
// Данные, отправляемые на сервер при логинизации
export type TLoginData = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

// Смена имени и аватара
export type TProfileData = {
    avatar?: string;
    name?: string;
};

// ответ при не верном введении логина или пароля
export type TResponse = {
    email: string;
    error: string;
    in: string;
};
