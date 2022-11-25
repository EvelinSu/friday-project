import { instance } from "./instance";
import {
    TCard,
    TCardsPackUpdate,
    TCardsParams,
    TCardUpdate,
    TNewCard,
    TNewCardsPack,
    TPack,
    TPacksParams,
    TResponseCard,
    TResponsePack,
    // TResponseUploadGrate,
    TUploadGrate,
} from "./ResponseTypes";
import { AxiosResponse } from "axios";

export const cardsAPI = {
    getPacks(params: TPacksParams) {
        return instance.get(`/cards/pack`, { params });
    },
    addPack(cardsPack: TNewCardsPack) {
        return instance.post<TNewCardsPack, AxiosResponse<TResponsePack>>("/cards/pack", { cardsPack });
    },
    deletePack(id: string) {
        return instance.delete<TPack>(`/cards/pack?id=${id}`);
    },
    updatePack(cardsPack: TCardsPackUpdate) {
        return instance.put<TCardsPackUpdate, AxiosResponse<TPack>>(`/cards/pack`, { cardsPack });
    },
    getCards(params: TCardsParams) {
        return instance.get(`/cards/card`, { params });
    },
    addCard(card: TNewCard) {
        return instance.post<TNewCard, AxiosResponse<TResponseCard>>("/cards/card", { card });
    },
    deleteCard(id: string) {
        return instance.delete<TCard>(`/cards/card?id=${id}`);
    },
    updateCard(card: TCardUpdate) {
        return instance.put<TCardUpdate, AxiosResponse<TCard>>(`/cards/card`, { card });
    },
};

export const gradeAPI = {
    updateGrade(data: TUploadGrate) {
        return instance.put("/cards/grade", data);
    },
};
