import { instance } from "./instance";
import { TCardsPackUpdate, TNewCardsPack, TPack, TPacksParams, TResponsePack } from "./ResponseTypes";
import { AxiosResponse } from "axios";

export const packsAPI = {
    getPacks(params: TPacksParams) {
        return instance.get<TResponsePack>(`/cards/pack`, { params });
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
};
