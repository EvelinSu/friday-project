import {TCardsParams, TPacksParams} from "../../dal/ResponseTypes";

type TURLParams = TPacksParams & TCardsParams

export const getUrlParams = (searchParams: URLSearchParams): TURLParams => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    let pageCount = windowHeight > 1030 ? 24 : windowHeight > 860 ? 16 : 12;
    if (windowWidth < 1250 && windowWidth > 1020) {
        pageCount = pageCount + 1;
    }

    const params: any = {};

    searchParams.forEach((key, value) => {
        params[value] = key;
    });

    return {
        ...params,
        page: params.page ? params.page : "1",
        pageCount: params.pageCount || pageCount,
    };
};


