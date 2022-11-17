import { TPacksParams } from "../../dal/ResponseTypes";

export const getActualPacksParams = (searchParams: URLSearchParams): TPacksParams => {
    const windowHeight = window.innerHeight;
    const pageCount = windowHeight > 1080 ? 20 : windowHeight > 930 ? 16 : 12;
    return {
        user_id: searchParams.get("user_id") || undefined,
        packName: searchParams.get("pack_name") || undefined,
        min: Number(searchParams.get("min")) || undefined,
        max: Number(searchParams.get("max")) || undefined,
        sortPacks: (searchParams.get("sort_packs") as string) || undefined,
        page: Number(searchParams.get("page")) || 1,
        pageCount: Number(searchParams.get("page_count")) || pageCount,
    };
};
