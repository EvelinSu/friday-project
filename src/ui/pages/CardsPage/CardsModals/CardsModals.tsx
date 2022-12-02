import React, { FC, useMemo } from "react";
import { TCardModals } from "../CardsList";
import DeleteModal from "../../../components/Modals/DeleteModal";
import AddAndUpdateCardModal, { TAddAndUpdateCardModalValues } from "./AddAndUpdateCardModal";
import { CardViewModal } from "./CardViewModal";
import { deleteCard, updateCard } from "../../../../bll/cardsReducer";
import { useAppDispatch } from "../../../../hooks/hooks";
import { getUrlParams } from "../../../../common/utils/getUrlParams";
import { useSearchParams } from "react-router-dom";
import { TCard } from "../../../../dal/ResponseTypes";

type TCardModalsProps = {
    modalType: TCardModals;
    currentCard?: TCard;
    currentId: string;
    setIsCardModalOpen: (isCardModalOpen: TCardModals) => void;
};
export const CardModals: FC<TCardModalsProps> = ({
    modalType,
    currentCard,
    currentId,
    setIsCardModalOpen,
}) => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const updateCardHandler = (values: TAddAndUpdateCardModalValues) => {
        dispatch(updateCard({_id: currentId, values, paramURL: URLParams})).then(() => {
            setIsCardModalOpen(false);
        });
    };

    const deleteHandler = () => {
        dispatch(deleteCard({id: currentId, URLParams})).then(() => {
            setIsCardModalOpen(false);
        });
    };

    if (modalType === "delete") {
        return (
            <DeleteModal
                onClose={() => setIsCardModalOpen(false)}
                deleteHandler={deleteHandler}
                text={"Do you really want to remove this card?"}
                title={"Delete card"}
            />
        );
    }
    if (modalType === "update") {
        return (
            <AddAndUpdateCardModal
                title={"Update card"}
                onSubmitHandler={updateCardHandler}
                onClose={() => setIsCardModalOpen(false)}
                currentCard={currentCard}
            />
        );
    }

    if (modalType === "view") {
        return (
            <CardViewModal
                title={"Update card"}
                onClose={() => setIsCardModalOpen(false)}
                currentCard={currentCard}
            />
        );
    }

    return <></>;
};
