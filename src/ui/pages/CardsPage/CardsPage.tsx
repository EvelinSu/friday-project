import React, {useEffect, useMemo} from "react";
import {SPageWrapper} from "../styled";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {useSearchParams} from "react-router-dom";
import LoaderIcon from "../../assets/loaders/loader";
import {getUrlParams} from "../../../common/utils/getUrlParams";
import {CardsNotFound} from "./CardsNotFound/CardsNotFound";
import CardsList from "./CardsList";
import {loadCards} from "../../../bll/cardsReducer";
import Pagination from "../../components/Pagination/Pagination";
import CardsPagePanel from "./CardsPagePanel/CardsPagePanel";

export const CardsPage = () => {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const isFetching = useAppSelector((state) => state.app.isFetching);
    const cards = useAppSelector((state) => state.cards.cardsData.cards);
    const cardsTotalCount = useAppSelector((state) => state.cards.cardsData.cardsTotalCount);
    const pageCount = useAppSelector((state) => state.cards.cardsData.pageCount);

    useEffect(() => {
        dispatch(loadCards(URLParams));
    }, [URLParams]);

    return (
        <SPageWrapper>
            {isFetching && <LoaderIcon absolute />}
            <CardsPagePanel />
            {cards.length > 0 ? <CardsList /> : <CardsNotFound isCardsFetching={isFetching} />}
            <Pagination
                totalCount={cardsTotalCount}
                isFetching={isFetching}
                pageCount={+(URLParams.pageCount || pageCount)}
            />
        </SPageWrapper>
    );
};

