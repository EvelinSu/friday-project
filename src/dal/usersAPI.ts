import { instance } from "./instance";
import { TResponseUserData, TUsersParams } from "./ResponseTypes";

export const usersAPI = {
    getUser(id: string) {
        return instance.get<{ user: TResponseUserData }>(`social/user?id=${id}`);
    },
    getUsers(params: TUsersParams) {
        return instance.get(`social/users`, { params });
    },
};
