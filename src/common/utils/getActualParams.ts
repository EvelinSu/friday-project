import { TPacksParams } from "../../dal/ResponseTypes";

export const getUrlPacksParams = (searchParams: URLSearchParams): TPacksParams => {
    const windowHeight = window.innerHeight;
    const pageCount = windowHeight > 1080 ? 20 : windowHeight > 930 ? 16 : 12;

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
