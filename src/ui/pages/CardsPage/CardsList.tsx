import React, { useCallback, useMemo, useState } from "react";
import { GridBox, SGridDefaultBlock } from "../../components/GridBox/GridBox";
import { useSearchParams } from "react-router-dom";
import { getUrlParams } from "../../../common/utils/getUrlParams";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { Card } from "./Card/Card";
import AddAndUpdateCardModal, {
    TAddAndUpdateCardModalValues,
} from "./CardsModals/AddAndUpdateCardModal";
import { deleteCard, updateCard } from "../../../bll/cardsReducer";
import DeleteModal from "../../components/Modals/DeleteModal";
import { getCountArray } from "../../../common/utils/getCountArray";

export type TCardModals = "delete" | "update" | "view" | false;

const CardsList = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);
    const cards = useAppSelector((state) => state.cards.cardsData.cards);
    const isFetching = useAppSelector((state) => state.app.isFetching);

    const windowWidth = window.innerWidth;
    const rowsCount = URLParams.pageCount && +URLParams.pageCount > 8 ? +URLParams.pageCount / 4 : 4;

    const [isCardModalOpen, setIsCardModalOpen] = useState<TCardModals>(false);
    const [currentId, setCurrentId] = useState<string>("");

    const onIconClickHandler = useCallback(
        (e: React.MouseEvent<HTMLDivElement>, id: string, modalType: TCardModals) => {
            e.stopPropagation();
            setIsCardModalOpen(modalType);
            setCurrentId(id);
        },
        []
    );

    const updateCardHandler = (values: TAddAndUpdateCardModalValues) => {
        dispatch(updateCard({ _id: currentId, values, paramURL: URLParams })).then(() => {
            setIsCardModalOpen(false);
        });
    };

    const deleteHandler = () => {
        dispatch(deleteCard({ id: currentId, URLParams })).then(() => {
            setIsCardModalOpen(false);
        });
    };

    // const viewCardHandler = () => {
    //     setIsCardModalOpen(false);
    // };

    const cardsSkeleton = getCountArray(Number(URLParams.pageCount) - cards.length || 0).map((el) => (
        <SGridDefaultBlock minHeight={"145px"} key={el}></SGridDefaultBlock>
    ));

    return (
        <GridBox
            columns={"repeat(auto-fill, minmax(250px, 1fr))"}
            style={{ flexGrow: windowWidth > 540 ? 1 : "" }}
            rows={windowWidth > 540 ? `repeat(${rowsCount}, minmax(145px, 200px))` : ``}
        >
            {cards.map((card) => (
                <Card
                    key={card._id}
                    card={card}
                    onIconClickHandler={onIconClickHandler}
                    isFetching={isFetching}
                />
            ))}
            {windowWidth > 540 && cardsSkeleton}
            {isCardModalOpen === "delete" && (
                <DeleteModal
                    onClose={() => setIsCardModalOpen(false)}
                    deleteHandler={deleteHandler}
                    text={"Do you really want to remove this card?"}
                    title={"Delete card"}
                />
            )}
            {isCardModalOpen === "update" && (
                <AddAndUpdateCardModal
                    title={"Update card"}
                    onSubmitHandler={updateCardHandler}
                    onClose={() => setIsCardModalOpen(false)}
                    currentCard={cards.find((el) => el._id === currentId)}
                />
            )}
            {/*{isCardModalOpen === "view" && (*/}
            {/*    <CardViewModal*/}
            {/*        title={"Update card"}*/}
            {/*        onClose={() => setIsCardModalOpen(false)}*/}
            {/*        currentCard={cards.find((el) => el._id === currentId)}*/}
            {/*    />*/}
            {/*)}*/}
        </GridBox>
    );
};

export default CardsList;
