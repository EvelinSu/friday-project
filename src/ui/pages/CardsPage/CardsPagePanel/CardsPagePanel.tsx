import React, { useMemo, useState } from "react";
import { Box } from "../../../components/Box/Box";
import { SPagePanel } from "../../styled";
import Button from "../../../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUrlParams } from "../../../../common/utils/getUrlParams";
import { Search } from "../../../components/Search/Search";
import AddAndUpdateCardModal, {
    TAddAndUpdateCardModalValues,
} from "../CardsModals/AddAndUpdateCardModal";
import { addNewCard, setIsLearning } from "../../../../bll/cardsReducer";
import { PATH } from "../../Pages";
import { AddIcon } from "../../../assets/icons/AddIcon";
import BookCheckIcon from "../../../assets/icons/BookCheckIcon";
import BackPageButton from "../../../components/BackPageButton/BackPageButton";
import { CardsFilter } from "../Filter/CardsFilter";

const windowWidth = window.innerWidth;

const PacksPagePanel = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const packsParams = useAppSelector((state) => state.URLParams.packsParams);
    const userId = useAppSelector((state) => state.cards.cardsData.packUserId);
    const packName = useAppSelector((state) => state.cards.cardsData.packName);
    const isFetching = useAppSelector((state) => state.app.isFetching);
    const cardsTotalCount = useAppSelector((state) => state.cards.cardsData.cardsTotalCount);
    const myId = useAppSelector((state) => state.auth.myData.id);

    const addNewCardHandler = (values: TAddAndUpdateCardModalValues) => {
        dispatch(
            addNewCard({
                newCard: { ...values, cardsPack_id: URLParams.cardsPack_id },
                cardsParams: URLParams,
            })
        ).then((res) => res.payload && setIsAddCardModalOpen(false));
    };

    const learnPackHandler = () => {
        dispatch(setIsLearning(true));
        navigate(PATH.learning + `?cardsPack_id=${URLParams.cardsPack_id}`);
    };

    return (
        <SPagePanel>
            <Box alignItems={"center"} justifyContent={"space-between"}>
                <BackPageButton
                    params={packsParams}
                    isDisabled={isFetching}
                    label={"Exit " + (userId === myId ? "my pack" : packName ? `«${packName}»` : "pack")}
                    to={PATH.packsList}
                    onClick={() => dispatch(setIsLearning(false))}
                />
                <Box>
                    {userId === myId && (
                        <Button
                            onClick={() => setIsAddCardModalOpen(true)}
                            label={windowWidth > 570 ? "Add card" : ""}
                            icon={<AddIcon />}
                            isDisabled={isFetching}
                            withShadow
                        />
                    )}
                    <Button
                        onClick={learnPackHandler}
                        label={windowWidth > 570 ? "Learn pack" : ""}
                        icon={<BookCheckIcon />}
                        isDisabled={cardsTotalCount < 1 || isFetching}
                        withShadow
                    />
                </Box>
            </Box>
            <Box alignItems={"center"}>
                <Search placeholder={"Search by question"} addParamToUrl={"cardQuestion"} />
                <CardsFilter />
            </Box>
            {isAddCardModalOpen && (
                <AddAndUpdateCardModal
                    title={"Add new card"}
                    onSubmitHandler={addNewCardHandler}
                    onClose={() => setIsAddCardModalOpen(false)}
                />
            )}
        </SPagePanel>
    );
};

export default PacksPagePanel;
