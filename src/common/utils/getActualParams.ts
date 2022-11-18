import { TPacksParams } from "../../dal/ResponseTypes";

export const getUrlPacksParams = (searchParams: URLSearchParams): TPacksParams => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    let pageCount = windowHeight > 1070 ? 25 : windowHeight > 930 ? 20 : 15;
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
        pageCount: params.pageCount || `${pageCount}`,
    };
};
