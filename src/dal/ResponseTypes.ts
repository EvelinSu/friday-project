// pack types

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
    deckCover: string;
};

export type TCardsPackUpdate = {
    _id: string;
    name: string;
    deckCover: string;
    private: boolean;
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

// card types

export type TCard = {
    answer: string;
    answerImg: string;
    answerVideo: string;
    cardPacks_id: string;
    comments: string;
    created: string;
    grade: number;
    question: string;
    questionImg: string;
    questionVideo: string;
    rating: number;
    shots: number;
    updated: string;
    user_id: string;
    _id: string;
};

export type TCardUpdate = {
    _id: string;
    answer?: string;
    question?: string;
    answerImg?: string;
    questionImg?: string;
};

export type TNewCard = {
    question?: string;
    answer?: string;
    cardsPack_id: string;
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

export type TResponseCard = {
    cards: TCard[];
    cardsTotalCount: number;
    maxGrade: number;
    minGrade: number;
    packCreated: string;
    packDeckCover: string;
    packName: string;
    packPrivate: boolean;
    packUpdated: string;
    packUserId: string;
    page: number;
    pageCount: number;
};

// user types

export type TResponseUserData = {
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

export type TResponseUsersData = {
    maxPublicCardPacksCount: number;
    minPublicCardPacksCount: number;
    page: number;
    pageCount: number;
    users: TResponseUserData[];
    usersTotalCount: number;
};

export type TUsersParams = {
    page?: string;
    pageCount?: string;
    sortUsers?: string;
    userName?: string;
    min?: string;
    max?: string;
};

// auth types

export type TResponseAuthData = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    token?: string;
    avatar?: string;
};

export type TRegisterData = {
    email: string;
    password: string;
};

export type TSendPassData = {
    password: string;
    resetPasswordToken: string;
};

// Data that is sent to the server when the user logged in
export type TLoginData = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

// Name and avatar change
export type TProfileData = {
    avatar?: string;
    name?: string;
};

export type TResponseChangeUserProfile = {
    updatedUser: TResponseAuthData;
    token: string;
};

// learning types

export type TUploadGrade = {
    grade: number;
    card_id: string;
};

export type TUpdateGrade = {
    _id: string;
    cardsPack_id: string;
    card_id: string;
    user_id: string;
    grade: number;
    shots: number;
};

export type TUploadGradeResponse = {
    updatedGrade: TUpdateGrade;
};

export type TResponseSendEmail = {
    info: string;
    success: boolean;
    answer: boolean;
    html: boolean;
};
