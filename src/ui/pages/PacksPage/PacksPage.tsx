import React, { useEffect, useMemo } from "react";
import { SPageWrapper } from "../styled";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Pagination from "../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import LoaderIcon from "../../assets/loaders/loader";
import { getUrlPacksParams } from "../../../common/utils/getActualParams";
import { loadPacks } from "../../../bll/packsReducer";
import PacksList from "./PacksList";
import PacksPagePanel from "./PacksPagePanel/PacksPagePanel";
import PacksNotFound from "./PacksNotFound/PacksNotFound";

const PacksPage = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlPacksParams(searchParams), [searchParams]);

    const cardPacks = useAppSelector((state) => state.packs.cardPacksData.cardPacks);
    const cardPacksData = useAppSelector((state) => state.packs.cardPacksData);
    const isFetching = useAppSelector((state) => state.app).isFetching;

    useEffect(() => {
        dispatch(loadPacks(URLParams));
    }, [URLParams]);

    return (
        <SPageWrapper>
            {isFetching && <LoaderIcon absolute />}
            <PacksPagePanel />
            {cardPacks.length > 0 ? <PacksList /> : <PacksNotFound isPacksFetching={isFetching} />}
            <Pagination
                totalCount={cardPacksData.cardPacksTotalCount}
                isFetching={isFetching}
                pageCount={+(URLParams.pageCount || +cardPacksData.pageCount)}
            />
        </SPageWrapper>
    );
};

export default PacksPage;
