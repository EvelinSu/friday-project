import React, { useEffect, useMemo, useState } from "react";
import { SPageWrapper } from "../styled";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";
import LoaderIcon from "../../assets/loaders/loader";
import { getUrlParams } from "../../../common/utils/getUrlParams";
import { CardsNotFound } from "./CardsNotFound/CardsNotFound";
import CardsList from "./CardsList";
import { loadCards } from "../../../bll/cardsReducer";
import Pagination from "../../components/Pagination/Pagination";
import CardsPagePanel from "./CardsPagePanel/CardsPagePanel";
import { Box } from "../../components/Box/Box";
import { PageCountDropdown } from "../../components/PageCountDropdown/PageCountDropdown";
import { setCardsParams } from "../../../bll/paramsReducer";

export const CardsPage = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);
    const [pageCount, setPageCount] = useState(+(URLParams.pageCount || 0));

    const isFetching = useAppSelector((state) => state.app.isFetching);
    const cards = useAppSelector((state) => state.cards.cardsData.cards);
    const cardsTotalCount = useAppSelector((state) => state.cards.cardsData.cardsTotalCount);

    const onChangePageCountHandler = (count: number) => {
        setSearchParams({ ...URLParams, pageCount: `${count}` });
    };

    useEffect(() => {
        setPageCount(+(URLParams.pageCount || 0));
        dispatch(setCardsParams(URLParams));
        dispatch(loadCards(URLParams));
    }, [URLParams]);

    const pageCounts = [12, 16, 20, 24, 28, 32, 36, 40, 44, 48];

    return (
        <SPageWrapper>
            <CardsPagePanel />
            <Box flexGrow={1} position={"relative"} overflow={"hidden"}>
                {isFetching && <LoaderIcon borderRadius={"20px"} absolute />}
                {cards.length > 0 ? <CardsList /> : <CardsNotFound isCardsFetching={isFetching} />}
            </Box>
            <Box alignItems={"center"} margin="auto 0 10px 0">
                <Box overflow={"auto"}>
                    <Pagination
                        totalCount={cardsTotalCount}
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
