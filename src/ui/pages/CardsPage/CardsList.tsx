import React, { useCallback, useMemo, useState } from "react";
import { GridBox, SGridDefaultBlock } from "../../components/GridBox/GridBox";
import { useSearchParams } from "react-router-dom";
import { getUrlParams } from "../../../common/utils/getUrlParams";
import { useAppSelector } from "../../../hooks/hooks";
import { Card } from "./Card/Card";
import { getCountArray } from "../../../common/utils/getCountArray";
import { baseTheme } from "../../styles/themes/baseTheme";
import { CardModals } from "./CardsModals/CardsModals";

const windowWidth = window.innerWidth;
const smallScreen = baseTheme.media.small;

const CardsList = () => {
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const [isCardModalOpen, setIsCardModalOpen] = useState<TCardModals>(false);
    const [currentId, setCurrentId] = useState<string>("");

    const cards = useAppSelector((state) => state.cards.cardsData.cards);
    const isFetching = useAppSelector((state) => state.app.isFetching);

    const onIconClickHandler = useCallback(
        (e: React.MouseEvent<HTMLDivElement>, id: string, modalType: TCardModals) => {
            e.stopPropagation();
            setIsCardModalOpen(modalType);
            setCurrentId(id);
        },
        []
    );

    const rowsCount = URLParams.pageCount && +URLParams.pageCount > 8 ? +URLParams.pageCount / 4 : 4;

    const cardsSkeleton = getCountArray(Number(URLParams.pageCount) - cards.length || 0).map((el) => (
        <SGridDefaultBlock minHeight={"145px"} key={el}></SGridDefaultBlock>
    ));

    return (
        <GridBox
            columns={"repeat(auto-fill, minmax(250px, 1fr))"}
            style={{flexGrow: windowWidth > smallScreen ? 1 : ""}}
            rows={windowWidth > smallScreen ? `repeat(${rowsCount}, minmax(145px, 200px))` : ``}
        >
            {cards.map((card) => (
                <Card
                    key={card._id}
                    card={card}
                    onIconClickHandler={onIconClickHandler}
                    isFetching={isFetching}
                />
            ))}
            {windowWidth > smallScreen && cardsSkeleton}
            <CardModals
                modalType={isCardModalOpen}
                currentCard={cards.find((el) => el._id === currentId)}
                currentId={currentId}
                setIsCardModalOpen={setIsCardModalOpen}
            />
        </GridBox>
    );
};

export type TCardModals = "delete" | "update" | "view" | false;

export default CardsList;
