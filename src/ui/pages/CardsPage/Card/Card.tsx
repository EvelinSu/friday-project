import React, {FC} from 'react';
import {TCard} from "../../../../dal/ResponseTypes";
import {SCardIcons, SCardShadow, SCardText, SCardWrapper} from "./styled";
import {SText} from "../../../components/Text/SText";
import IconButton from "../../../components/IconButton/IconButton";
import EditIcon from "../../../assets/icons/EditIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import {Box} from "../../../components/Box/Box";
import {transformDate} from "../../../../common/utils/tarnsformDate";
import {Stars} from "../../../components/Stars/Stars";
import {useAppSelector} from "../../../../hooks/hooks";
import {TPackModals} from "../../PacksPage/PacksList";

type TCardProps = {
    card: TCard
    isFetching: boolean
    onIconClickHandler: (
        e: React.MouseEvent<HTMLDivElement>,
        id: string,
        modalType: TPackModals
    ) => void;
}
export const Card: FC<TCardProps> = (props) => {
    const correctDate = transformDate(props.card.updated);
    const myId = useAppSelector(state => state.auth.userData.id)
    const userId = useAppSelector(state => state.cards.cardsData.packUserId)

    return (
        <SCardWrapper>
            <SCardShadow>
                <SCardText title={props.card.answer} lineClamp={userId !== myId ? 5 : 3}>
                    {props.card.answer}
                </SCardText>
                {userId === myId && (
                    <SCardIcons>
                        <IconButton
                            isDisabled={props.isFetching}
                            size={"sm"}
                            icon={<EditIcon />}
                            color={"#fff"}
                            onClick={(e) => props.onIconClickHandler(e, props.card._id, "update")}
                        />
                        <IconButton
                            isDisabled={props.isFetching}
                            size={"sm"}
                            icon={<DeleteIcon />}
                            onClick={(e) => props.onIconClickHandler(e, props.card._id, "delete")}
                        />
                    </SCardIcons>
                )}
            </SCardShadow>
            <Box margin={"0 auto 0 0"} gap={5}>
                <SText opacity={0.4}>
                    Last updated
                </SText>
                <SText>
                    {correctDate}
                </SText>
            </Box>
            <SCardText title={props.card.question}>
                {props.card.question}
            </SCardText>
            <Stars isEditable={false} current={props.card.grade} maxCount={5} />
        </SCardWrapper>
    );
};

