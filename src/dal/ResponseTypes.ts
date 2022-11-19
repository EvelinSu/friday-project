export type TPack = {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    deckCover: string;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
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
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
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

export type TLoginData = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

export type TProfileData = {
    avatar?: string;
    name?: string;
};

export type TResponseUserData = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
    token?: string;
    tokenDeathTime?: number;
    avatar?: string;
};

export type TResponseChangeUserProfile = {
    updatedUser: TResponseUserData;
    token: string;
    tokenDeathTime: number;
};

export type TResponseSendEmail = {
    info: string;
    success: boolean;
    answer: boolean;
    html: boolean;
};

export type TSendPassData = {
    password: string;
    resetPasswordToken: string;
};
