import { instance } from "./instance";

export const userAPI = {
    getUser(id: string) {
        return instance.get(`social/user?id=${id}`);
    },
};
