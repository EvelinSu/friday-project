import { instance } from "./instance";
import { TUserData } from "./ResponseTypes";

export const userAPI = {
    getUser(id: string) {
        return instance.get<{ user: TUserData }>(`social/user?id=${id}`);
    },
};
