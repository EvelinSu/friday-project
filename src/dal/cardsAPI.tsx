import { instance } from "./instance";
import { TNewCardsPack, TPacksParams } from "./ResponseTypes";

export const packsAPI = {
    getPacks(params: TPacksParams) {
        return instance.get(`/cards/pack`, { params });
    },
    addPack(cardsPack: TNewCardsPack) {
        return instance.post("/cards/pack", { cardsPack });
    },
};

// export const packsAPI = {
//     getPacks(page: number, pageCount: number, userId?: string) {
//         return instance.get<TResponsePack>(
//             `cards/pack?page=${page}&pageCount=${pageCount}${
//                 userId ? "&user_id=" + userId : ""
//             }`
//         );
//     },
// };
