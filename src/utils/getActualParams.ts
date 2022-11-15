import { TPacksParams } from "../dal/ResponseTypes";

export const getActualPacksParams = (
    searchParams: URLSearchParams
): TPacksParams => {
    return {
        user_id: searchParams.get("user_id") || undefined,
        packName: searchParams.get("packName") || undefined,
        min: Number(searchParams.get("min")) || undefined,
        max: Number(searchParams.get("max")) || undefined,
        sortPacks: (searchParams.get("sortPacks") as string) || undefined,
        page: Number(searchParams.get("page")) || undefined,
        pageCount: Number(searchParams.get("pageCount")) || 12,
    };
};
