import { instance } from "./instance";
import { TResponsePack } from "./ResponseTypes";

export const packsAPI = {
    getPacks(page: number, pageCount: number, userId?: string) {
        return instance.get<TResponsePack>(
            `cards/pack?page=${page}&pageCount=${pageCount}${
                userId ? "&user_id=" + userId : ""
            }`
        );
    },
};
