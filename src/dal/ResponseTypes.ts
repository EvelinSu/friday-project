export type TPack = {
    _id: string;
    cardsCount: number;
    created: string;
    grade: number;
    more_id: string;
    path: string;
    name: string;
    type: string;
    private: boolean;
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
    min?: number;
    max?: number;
    sortPacks?: string;
    page?: number;
    pageCount?: number;
    user_id?: string;
};

export type TNewCardsPack = {
    name: string;
    deckCover: string;
    private?: boolean;
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
