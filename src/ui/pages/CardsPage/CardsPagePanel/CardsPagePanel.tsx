import React, { useMemo, useState } from "react";
import { Box } from "../../../components/Box/Box";
import { SMainTitle, SPagePanel } from "../../styled";
import Button from "../../../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUrlParams } from "../../../../common/utils/getUrlParams";
import { Search } from "../../../components/Search/Search";
import LongArrowIcon from "../../../assets/icons/LongArrowIcon";
import IconButton from "../../../components/IconButton/IconButton";
import AddAndUpdateCardModal, {
    TAddAndUpdateCardModalValues,
} from "../CardsModals/AddAndUpdateCardModal";
import { addNewCard } from "../../../../bll/cardsReducer";
import { PATH } from "../../Pages";
import { SText } from "../../../components/Text/SText";
import { AddIcon } from "../../../assets/icons/AddIcon";
import BookCheckIcon from "../../../assets/icons/BookCheckIcon";

const PacksPagePanel = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const packsParams = useAppSelector((state) => state.packsParams);
    const userId = useAppSelector((state) => state.cards.cardsData.packUserId);
    const packName = useAppSelector((state) => state.cards.cardsData.packName);
    const cardsTotalCount = useAppSelector((state) => state.cards.cardsData.cardsTotalCount);
    const myId = useAppSelector((state) => state.auth.userData.id);
    const windowWidth = window.innerWidth;

    const addNewCardHandler = (values: TAddAndUpdateCardModalValues) => {
        dispatch(
            addNewCard({
                newCard: { ...values, cardsPack_id: URLParams.cardsPack_id },
                cardsParams: URLParams,
            })
        ).then(() => setIsAddCardModalOpen(false));
    };

    const onBackClickHandler = () => {
        let params: string[] = [];
        Object.entries(packsParams).forEach((el) => el[1] !== "" && params.push(el.join("=")));
        const validParams = params.join("&");
        navigate(PATH.packsList + `?${validParams}`);
    };

    // for select (in future)
    // const options: TFilterOptions[] = ["Updated recently", "Updated long ago"];
    // const [option, setOption] = useState('');

    return (
        <SPagePanel>
            <Box margin={"0 0 20px 0"} alignItems={"center"} justifyContent={"space-between"}>
                <Box
                    overflow={"hidden"}
                    alignItems={"center"}
                    cursor={"pointer"}
                    onClick={onBackClickHandler}
                >
                    <IconButton icon={<LongArrowIcon />} isDark allowPropagation />
                    <SMainTitle isEllipsis>
                        {userId === myId ? "My pack" : packName || <SText opacity={0.2}>Pack</SText>}
                    </SMainTitle>
                </Box>
                <Box>
                    {userId === myId && (
                        <Button
                            onClick={() => setIsAddCardModalOpen(true)}
                            label={windowWidth > 570 ? "Add card" : ""}
                            icon={<AddIcon />}
                            withShadow
                        />
                    )}
                    <Button
                        onClick={() => alert("in progress")}
                        label={windowWidth > 570 ? "Learn pack" : ""}
                        icon={<BookCheckIcon />}
                        isDisabled={cardsTotalCount < 1}
                        withShadow
                    />
                </Box>
            </Box>
            <Box alignItems={"center"}>
                <Search />
                {/*<Box maxWidth={"200px"} width={"100%"}>*/}
                {/*    <Select*/}
                {/*        options={options}*/}
                {/*        onChangeOption={setOption}*/}
                {/*        value={option}*/}
                {/*        placeholder={"Sort by"}*/}
                {/*        padding={"10px 12px"}*/}
                {/*        color={"#fff"}*/}
                {/*    />*/}
                {/*</Box>*/}
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
