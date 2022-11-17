import React, { useEffect, useMemo } from "react";
import { SPageWrapper } from "../styled";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Pagination from "../../components/Pagination/Pagination";
import { Navigate, useSearchParams } from "react-router-dom";
import LoaderIcon from "../../assets/loaders/loader";
import { setCardParams } from "../../../bll/packsParamsReducer";
import { getActualPacksParams } from "../../../common/utils/getActualParams";
import { loadPacks } from "../../../bll/packsReducer";
import PacksList from "./PacksList";
import PacksPagePanel from "./PacksPagePanel/PacksPagePanel";
import { PATH } from "../Pages";

const PacksPage = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const { cardPacksData } = useAppSelector((state) => state.packs);
    const { isFetching, isLoggedIn } = useAppSelector((state) => state.auth);
    const { cardPacks } = useAppSelector((state) => state.packs.cardPacksData);

    const stateParams = useAppSelector((state) => state.packsParams);
    const URLParams = useMemo(() => getActualPacksParams(searchParams), [searchParams]);

    useEffect(() => {
        if (JSON.stringify(stateParams) !== JSON.stringify(URLParams)) {
            dispatch(setCardParams(URLParams));
        }
    }, [dispatch, URLParams]);

    useEffect(() => {
        dispatch(loadPacks(URLParams));
    }, [URLParams, dispatch]);

    if (!isLoggedIn) return <Navigate to={PATH.signIn} />;

    return (
        <SPageWrapper>
            {isFetching && <LoaderIcon absolute />}
            <PacksPagePanel />
            <PacksList />

            {cardPacks.length > 0 && (
                <Pagination
                    cardPacksTotalCount={cardPacksData.cardPacksTotalCount}
                    isFetching={isFetching}
                    pageCount={URLParams.pageCount || cardPacksData.pageCount}
                />
            )}
        </SPageWrapper>
    );
};

export default PacksPage;
