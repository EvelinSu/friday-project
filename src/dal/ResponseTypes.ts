export type TPack = {
    _id: string;
    cardsCount: number;
    created: string;
    grade: number;
    more_id: string;
    path: string;
    name: string;
    type: string;
    private: boolean; // on server it name is "private"
    rating: number;
    shots: number;
    updated: string;
    user_id: string;
    user_name: string;
    deckCover: string;
};

export type TCard = {
    answer: string,
    cardPacks_id: string,
    comments: string,
    created: string,
    grade: number,
    question: string,
    rating: number,
    shots: number,
    updated: string,
    user_id: string,
    _id: string
}

export type TUserData = {
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
export type TCardUpdate = {
    _id: string;
    answer?: string;
    question?: string;
    answerImg?: string;
    questionImg?: string
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

export type TResponseCard = {
    cards: TCard[];
    cardsTotalCount: number;
    maxGrade: number,
    minGrade: number,
    packCreated: string,
    packDeckCover: string,
    packName: string,
    packPrivate: boolean,
    packUpdated: string,
    packUserId: string,
    page: number,
    pageCount: number,
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

export type TNewCard = {
    question?: string;
    answer?: string;
    cardsPack_id: string
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

export type TCardsParams = {
    cardAnswer?: string;
    cardQuestion?: string;
    cardsPack_id: string;
    min?: string;
    max?: string;
    sortCards?: string;
    page?: string;
    pageCount?: string;
};