import React, { useEffect, useMemo } from "react";
import { SPageWrapper } from "../styled";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Pagination from "../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import LoaderIcon from "../../assets/loaders/loader";
import { setCardParams } from "../../../bll/packsParamsReducer";
import { getActualPacksParams } from "../../../common/utils/getActualParams";
import { loadPacks } from "../../../bll/packsReducer";
import PacksList from "./PacksList";
import PacksPagePanel from "./PacksPagePanel/PacksPagePanel";

const PacksPage = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const { cardPacksData } = useAppSelector((state) => state.packs);
    const { isFetching } = useAppSelector((state) => state.auth);

    const stateParams = useAppSelector((state) => state.packsParams);
    const URLParams = useMemo(
        () => getActualPacksParams(searchParams),
        [searchParams]
    );

    useEffect(() => {
        if (JSON.stringify(stateParams) !== JSON.stringify(URLParams)) {
            dispatch(setCardParams(URLParams));
        }
    }, [dispatch, URLParams]);

    useEffect(() => {
        console.log(URLParams);
        dispatch(loadPacks(URLParams));
    }, [dispatch, stateParams]);

    return (
        <SPageWrapper>
            {isFetching && <LoaderIcon absolute />}
            <PacksPagePanel />
            <PacksList />
            <Pagination
                cardPacksTotalCount={cardPacksData.cardPacksTotalCount}
                isFetching={isFetching}
                pageCount={URLParams.pageCount || cardPacksData.pageCount}
            />
        </SPageWrapper>
    );
};

export default PacksPage;
