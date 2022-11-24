import React, {useEffect, useMemo} from "react";
import {SPageWrapper} from "../styled";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import Pagination from "../../components/Pagination/Pagination";
import {useSearchParams} from "react-router-dom";
import LoaderIcon from "../../assets/loaders/loader";
import {loadPacks} from "../../../bll/packsReducer";
import PacksList from "./PacksList";
import PacksPagePanel from "./PacksPagePanel/PacksPagePanel";
import {setCardParams} from "../../../bll/packsParamsReducer";
import {PacksNotFound} from "./PacksNotFound/PacksNotFound";
import {getUrlParams} from "../../../common/utils/getUrlParams";

const PacksPage = () => {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const cardPacksData = useAppSelector((state) => state.packs.cardPacksData);
    const isFetching = useAppSelector((state) => state.app.isFetching);
    const cardPacks = useAppSelector((state) => state.packs.cardPacksData.cardPacks);

    useEffect(() => {
        dispatch(setCardParams(URLParams));
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
