import { instance } from "./instance";
import { TNewCardsPack, TPacksParams } from "./ResponseTypes";

export const packsAPI = {
    getPacks(params: TPacksParams) {
        return instance.get(`/cards/pack`, { params });
    },
    addPack(cardsPack: TNewCardsPack) {
        return instance.post("/cards/pack", { cardsPack });
    },
    deletePack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`);
    },
};
