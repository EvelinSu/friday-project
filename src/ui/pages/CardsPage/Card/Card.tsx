import React, {FC} from 'react';
import {TCard} from "../../../../dal/ResponseTypes";
import {SCardIcons, SCardImage, SCardShadow, SCardText, SCardWrapper} from "./styled";
import {SText} from "../../../components/Text/SText";
import IconButton from "../../../components/IconButton/IconButton";
import EditIcon from "../../../assets/icons/EditIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import {Box} from "../../../components/Box/Box";
import {transformDate} from "../../../../common/utils/tarnsformDate";
import {Stars} from "../../../components/Stars/Stars";
import {useAppSelector} from "../../../../hooks/hooks";
import {TCardModals} from "../CardsList";

type TCardProps = {
    card: TCard
    isFetching: boolean
    onIconClickHandler: (
        e: React.MouseEvent<HTMLDivElement>,
        id: string,
        modalType: TCardModals
    ) => void;
}
export const Card: FC<TCardProps> = (props) => {
    const correctDate = transformDate(props.card.updated);
    const myId = useAppSelector(state => state.auth.userData.id)
    const userId = useAppSelector(state => state.cards.cardsData.packUserId)

    const answerImg = props.card.answerImg
    const questionImg = props.card.questionImg

    return (
        <SCardWrapper onClick={(e) => props.onIconClickHandler(e, props.card._id, "view")}>
            <SCardShadow>
                {answerImg && answerImg !== "null"
                    ? <SCardImage src={answerImg} />
                    : <SCardText title={props.card.answer} lineClamp={userId !== myId ? 5 : 3}>
                        {props.card.answer}
                    </SCardText>}
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
            {questionImg && questionImg !== "null"
                ? <SCardImage src={questionImg} />
                : <SCardText title={props.card.question}>{props.card.question}</SCardText>}
            <Stars isEditable={false} current={props.card.grade} maxCount={5} />
        </SCardWrapper>
    );
};

