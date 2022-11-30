import React, { FC, useState } from "react";
import { TCard } from "../../../../dal/ResponseTypes";
import { SMegaShadow } from "../../../components/MegaShadow/styled";
import { UiBox } from "../../../components/UiBox/UiBox";
import LoaderIcon from "../../../assets/loaders/loader";
import { Box } from "../../../components/Box/Box";
import { GridBox } from "../../../components/GridBox/GridBox";
import { Question } from "../../LearningPage/Question";
import { Answer } from "../../LearningPage/Answer";
import { SText } from "../../../components/Text/SText";
import { Grades } from "../../LearningPage/Grades";
import Button from "../../../components/Button/Button";
import { useAppSelector } from "../../../../hooks/hooks";

type TCardViewModal = {
    title: string;
    onClose: () => void;
    currentCard?: TCard;
};
export const CardViewModal: FC<TCardViewModal> = ({ currentCard, onClose }) => {
    const isFetching = useAppSelector((state) => state.app.isFetching);
    const [isAnswerOpen, setIsAnswerOpen] = useState(false);

    const checkQuestion =
        currentCard?.question && currentCard.question !== "no question" ? currentCard.question : "";
    const checkAnswer =
        currentCard?.answer && currentCard.answer !== "no answer" ? currentCard.answer : "";

    return (
        <SMegaShadow onClick={onClose}>
            <UiBox overflow={"auto"} title={"View card"} maxWidth={"700px"}>
                {isFetching && <LoaderIcon shadow absolute />}
                <Box flexDirection={"column"}>
                    <GridBox columns={"repeat(auto-fill, minmax(220px, 1fr))"}>
                        <Question checkQuestion={checkQuestion} questionImg={currentCard?.questionImg} />
                        <Answer
                            checkAnswer={checkAnswer}
                            setIsAnswerOpen={setIsAnswerOpen}
                            isAnswerOpen={isAnswerOpen}
                            answerImg={currentCard?.answerImg}
                        />
                    </GridBox>
                    <Box flexDirection={"column"} alignItems={"center"}>
                        <SText textAlign={"center"} fontSize={"16px"}>
                            Rating
                        </SText>
                        <Grades grade={currentCard?.grade || 0} />
                        <Button label={"Close"} onClick={onClose} severity={"neutral"} size={"lg"} />
                    </Box>
                </Box>
            </UiBox>
        </SMegaShadow>
    );
};
