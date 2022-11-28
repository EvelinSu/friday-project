import React, { FC } from "react";
import { TCard } from "../../../../dal/ResponseTypes";
import { SCardIcons, SCardImage, SCardShadow, SCardText, SCardWrapper } from "./styled";
import { SText } from "../../../components/Text/SText";
import IconButton from "../../../components/IconButton/IconButton";
import EditIcon from "../../../assets/icons/EditIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import { Box } from "../../../components/Box/Box";
import { transformDate } from "../../../../common/utils/tarnsformDate";
import { Stars } from "../../../components/Stars/Stars";
import { useAppSelector } from "../../../../hooks/hooks";
import { TCardModals } from "../CardsList";

type TCardProps = {
    card: TCard;
    isFetching: boolean;
    onIconClickHandler: (
        e: React.MouseEvent<HTMLDivElement>,
        id: string,
        modalType: TCardModals
    ) => void;
};
export const Card: FC<TCardProps> = (props) => {
    const cardId = props.card._id;
    const { updated, answerImg, questionImg, answer, question, grade } = props.card;
    const correctDate = transformDate(updated);
    const myId = useAppSelector((state) => state.auth.userData.id);
    const userId = useAppSelector((state) => state.cards.cardsData.packUserId);

    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>, modalType: TCardModals) => {
        props.onIconClickHandler(e, cardId, modalType);
    };

    return (
        <SCardWrapper isFetching={props.isFetching} onClick={(e) => onClickHandler(e, "view")}>
            <SCardShadow>
                {answerImg && answerImg !== "null" ? (
                    <SCardImage src={answerImg} />
                ) : (
                    <SCardText title={answer} lineClamp={userId !== myId ? 5 : 3}>
                        {answer}
                    </SCardText>
                )}
                {userId === myId && (
                    <SCardIcons>
                        <IconButton
                            isDisabled={props.isFetching}
                            size={"sm"}
                            icon={<EditIcon />}
                            color={"#fff"}
                            onClick={(e) => onClickHandler(e, "update")}
                        />
                        <IconButton
                            isDisabled={props.isFetching}
                            size={"sm"}
                            icon={<DeleteIcon />}
                            onClick={(e) => onClickHandler(e, "delete")}
                        />
                    </SCardIcons>
                )}
            </SCardShadow>
            <Box margin={"0 auto 0 0"} gap={5}>
                <SText opacity={0.4}>Last updated</SText>
                <SText>{correctDate}</SText>
            </Box>
            {questionImg && questionImg !== "null" ? (
                <SCardImage src={questionImg} />
            ) : (
                <SCardText title={question}>{question}</SCardText>
            )}
            <Stars isEditable={false} current={grade} maxCount={5} />
        </SCardWrapper>
    );
};
