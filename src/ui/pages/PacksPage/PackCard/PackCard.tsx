import React, {FC} from "react";
import {SPackCardActions, SPackCardPrivateIcon, SPackCardShadow, SPackCardWrapper} from "./styled";
import {Box} from "../../../components/Box/Box";
import {SText} from "../../../components/Text/SText";
import Avatar from "../../../components/Avatar/Avatar";
import IconButton from "../../../components/IconButton/IconButton";
import EditIcon from "../../../assets/icons/EditIcon";
import BookCheckIcon from "../../../assets/icons/BookCheckIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import {transformDate} from "../../../../common/utils/tarnsformDate";
import {TPack} from "../../../../dal/ResponseTypes";
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import LockFillIcon from "../../../assets/icons/LockFillIcon";
import defaultAvatar from "../../../assets/img/default-photo.png";
import {TPackModals} from "../PacksList";
import {useNavigate} from "react-router-dom";
import {initialParams} from "../../../../common/utils/getUrlParams";
import {PATH} from "../../Pages";
import {initialCardsData, setCards} from "../../../../bll/cardsReducer";

type TPackProps = {
    pack: TPack;
    onIconClickHandler: (
        e: React.MouseEvent<HTMLDivElement>,
        id: string,
        modalType: TPackModals
    ) => void;
    isFetching: boolean;
};
const PackCard: FC<TPackProps> = React.memo(({pack, onIconClickHandler, isFetching}) => {
    const dispatch = useAppDispatch()
    const myAvatar = useAppSelector((state) => state.auth.userData.avatar);
    const myId = useAppSelector((state) => state.auth.userData.id);
    const navigate = useNavigate()

    const avatar = pack.user_id === myId ? myAvatar : defaultAvatar
    const correctDate = transformDate(pack.updated);

    const onPackClickHandler = () => {
        dispatch(setCards(initialCardsData))
        navigate(PATH.cardsList + initialParams + `&cardsPack_id=${pack._id}`)
    }

    return (
        <SPackCardWrapper
            isFetching={isFetching}
            onClick={() => onPackClickHandler()}
            img={pack.deckCover}
        >
            <SPackCardShadow img={pack.deckCover}>
                <Box
                    overflow={"hidden"}
                    height={"100%"}
                    gap={10}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                >
                    <Box alignItems={"center"} gap={"5px"}>
                        {pack.private && (
                            <SPackCardPrivateIcon title={"Private pack"}>
                                <LockFillIcon />
                            </SPackCardPrivateIcon>
                        )}
                        <SText title={pack.name} isEllipsis>
                            {pack.name}
                        </SText>
                    </Box>
                    <Box gap={5} flexDirection={"column"}>
                        <Box gap={5}>
                            <SText opacity={0.4} whiteSpace={"nowrap"}>
                                Last updated:
                            </SText>
                            <SText isEllipsis>{correctDate}</SText>
                        </Box>
                        <Box gap={5}>
                            <SText opacity={0.4} whiteSpace={"nowrap"}>
                                Total cards:
                            </SText>
                            <SText isEllipsis>{pack.cardsCount}</SText>
                        </Box>
                    </Box>
                    <Box gap={10} alignItems={"center"}>
                        <Avatar img={avatar} size={"smallest"} />
                        <SText title={pack.user_name} isEllipsis>
                            {pack.user_name}
                        </SText>
                    </Box>
                </Box>
                <SPackCardActions>
                    <IconButton
                        onClick={() => alert("In progress")}
                        color={"#fff"}
                        size={"sm"}
                        isDisabled={isFetching || pack.cardsCount === 0}
                        icon={<BookCheckIcon />}
                    />
                    {myId === pack.user_id && (
                        <>
                            <IconButton
                                onClick={(e) => onIconClickHandler(e, pack._id, "update")}
                                color={"#fff"}
                                size={"sm"}
                                isDisabled={isFetching}
                                icon={<EditIcon />}
                            />
                            <IconButton
                                onClick={(e) => onIconClickHandler(e, pack._id, "delete")}
                                color={"#fff"}
                                size={"sm"}
                                isDisabled={isFetching}
                                icon={<DeleteIcon />}
                            />
                        </>
                    )}
                </SPackCardActions>
            </SPackCardShadow>
        </SPackCardWrapper>
    );
});

export default PackCard;
