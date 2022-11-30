import React, { useEffect, useMemo, useState } from "react";
import { SPageWrapper } from "../styled";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Pagination from "../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import LoaderIcon from "../../assets/loaders/loader";
import { loadPacks } from "../../../bll/packsReducer";
import PacksList from "./PacksList";
import PacksPagePanel from "./PacksPagePanel/PacksPagePanel";
import { setPacksParams } from "../../../bll/paramsReducer";
import { PacksNotFound } from "./PacksNotFound/PacksNotFound";
import { getUrlParams } from "../../../common/utils/getUrlParams";
import { Box } from "../../components/Box/Box";
import { PageCountDropdown } from "../../components/PageCountDropdown/PageCountDropdown";
import { shallowEqual } from "react-redux";

const PacksPage = () => {
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const isFetching = useAppSelector((state) => state.app.isFetching);
    const cardPacks = useAppSelector((state) => state.packs.cardPacksData.cardPacks, shallowEqual);
    const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksData.cardPacksTotalCount);
    const [pageCount, setPageCount] = useState(+(URLParams.pageCount || 0));

    const onChangePageCountHandler = (count: number) => {
        setSearchParams({ ...URLParams, pageCount: `${count}` });
    };

    useEffect(() => {
        setPageCount(+(URLParams.pageCount || 0));
        dispatch(setPacksParams(URLParams));
        dispatch(loadPacks(URLParams));
    }, [URLParams]);

    const pageCounts = [12, 16, 20, 24, 28, 32, 36, 40, 44, 48];

    return (
        <SPageWrapper>
            <PacksPagePanel />
            <Box flexGrow={1} position={"relative"} overflow={"hidden"}>
                {isFetching && <LoaderIcon borderRadius={"20px"} absolute />}
                {cardPacks.length > 0 ? <PacksList /> : <PacksNotFound isPacksFetching={isFetching} />}
            </Box>
            <Box alignItems={"center"} margin="auto 0 10px 0">
                <Box overflow={"auto"}>
                    <Pagination
                        totalCount={cardPacksTotalCount}
                        isFetching={isFetching}
                        pageCount={pageCount}
                    />
                </Box>
                <PageCountDropdown
                    pageCounts={pageCounts}
                    onClick={onChangePageCountHandler}
                    activeCount={pageCount}
                    isDisabled={isFetching}
                />
            </Box>
        </SPageWrapper>
    );
};

export default PacksPage;
