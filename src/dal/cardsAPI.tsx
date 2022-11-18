import { instance } from "./instance";
import { TCardsPackUpdate, TNewCardsPack, TPacksParams } from "./ResponseTypes";

export const packsAPI = {
    getPacks(params: TPacksParams) {
        return instance.get(`/cards/pack`, { params });
    },
    addPack(cardsPack: TNewCardsPack) {
        console.log(cardsPack);
        return instance.post("/cards/pack", { cardsPack });
    },
    deletePack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`);
    },
    updatePack(cardsPack: TCardsPackUpdate) {
        return instance.put(`/cards/pack`, { cardsPack });
    },
};
