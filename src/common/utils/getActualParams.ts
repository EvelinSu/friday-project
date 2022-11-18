import { TPacksParams } from "../../dal/ResponseTypes";

export const getUrlPacksParams = (searchParams: URLSearchParams): TPacksParams => {
    const windowHeight = window.innerHeight;
    const pageCount = windowHeight > 1070 ? 25 : windowHeight > 930 ? 20 : 15;

    const params: any = {};

    searchParams.forEach((key, value) => {
        params[value] = key;
    });

    return {
        ...params,
        page: params.page ? params.page : "1",
        pageCount: params.pageCount || `${pageCount}`,
    };
};
