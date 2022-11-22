import React, {useMemo, useState} from "react";
import {Box} from "../../../components/Box/Box";
import {SMainTitle, SPagePanel} from "../../styled";
import Button from "../../../components/Button/Button";
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getUrlParams} from "../../../../common/utils/getUrlParams";
import {SearchPack} from "../../PacksPage/PacksPagePanel/SearchPack";
import LongArrowIcon from "../../../assets/icons/LongArrowIcon";
import IconButton from "../../../components/IconButton/IconButton";
import AddAndUpdateCardModal, {TAddAndUpdateCardModalValues} from "../CardsModals/AddAndUpdateCardModal";
import {addNewCard} from "../../../../bll/cardsReducer";
import {PATH} from "../../Pages";
import {SText} from "../../../components/Text/SText";
import {AddIcon} from "../../../assets/icons/AddIcon";
import BookCheckIcon from "../../../assets/icons/BookCheckIcon";

const PacksPagePanel = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const packsParams = useAppSelector(state => state.packsParams)
    const userId = useAppSelector(state => state.cards.cardsData.packUserId)
    const packName = useAppSelector(state => state.cards.cardsData.packName)
    const myId = useAppSelector(state => state.auth.userData.id)

    const addNewCardHandler = (values: TAddAndUpdateCardModalValues) => {
        dispatch(
            addNewCard({newCard: {...values, cardsPack_id: URLParams.cardsPack_id}, cardsParams: URLParams}))
            .then(() => setIsAddCardModalOpen(false));
    };

    const onBackClickHandler = () => {
        const params = Object.entries(packsParams).map(el => el !== undefined && el.join("="))
        const validParams = params.join("&")
        navigate(PATH.packsList + `?${validParams}`)
    }

    // for select (in future)
    // const options: TFilterOptions[] = ["Updated recently", "Updated long ago"];
    // const [option, setOption] = useState('');

    return (
        <SPagePanel>
            <Box
                margin={"0 0 10px 0"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Box
                    overflow={"hidden"}
                    margin={"0 0 10px 0"}
                    alignItems={"center"}
                    cursor={"pointer"}
                    onClick={onBackClickHandler}
                >
                    <IconButton icon={<LongArrowIcon />} isDark allowPropagation />
                    <SMainTitle isEllipsis>
                        {userId === myId
                            ? 'My pack'
                            : packName || <SText opacity={0.2}>Pack</SText>
                        }
                    </SMainTitle>
                </Box>
                {userId === myId
                    ? <Button
                        onClick={() => setIsAddCardModalOpen(true)}
                        label={"Add card"}
                        icon={<AddIcon />}
                        withShadow
                    />
                    : <Button
                        onClick={() => alert('in progress')}
                        label={"Learn pack"}
                        icon={<BookCheckIcon />}
                        withShadow
                    />

                }
            </Box>
            <Box
                margin={"0 0 20px 0"}
                alignItems={"center"}
            >
                <SearchPack />
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
