import { TCardsParams, TPacksParams, TUsersParams } from "../../dal/ResponseTypes";

type TCommonURLParams = TPacksParams & TCardsParams & TUsersParams;

const windowHeight = window.innerHeight;
const pageCount = windowHeight > 1102 ? 20 : windowHeight > 942 ? 16 : 12;

export const initialStringParams = `?page=1&pageCount=${pageCount}`;
export const initialObjectParams = { page: `1`, pageCount: `${pageCount}` };

export const getUrlParams = (searchParams: URLSearchParams): TCommonURLParams => {
    const params = {} as TCommonURLParams;

    searchParams.forEach((key, value) => {
        params[value as keyof TCommonURLParams] = key;
    });

    return {
        ...params,
        page: params.page ? params.page : "1",
        pageCount: `${params.pageCount || pageCount}`,
    };
};
