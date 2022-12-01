import React, { FC } from "react";
import { LearningImage, SLearningBoxTitle, SLearningContainer, SLearningContent } from "./styled";
import { Box } from "../../components/Box/Box";
import Button from "../../components/Button/Button";

type TAnswerProps = {
    isAnswerOpen: boolean;
    setIsAnswerOpen: (isOpen: boolean) => void;
    checkAnswer: string;
    answerImg?: string;
};
export const Answer: FC<TAnswerProps> = (props) => {

    const checkAnswer = props.checkAnswer
        ? props.checkAnswer
        : props.answerImg
        && props.answerImg !== "null"
        && <LearningImage src={props.answerImg} alt={"answer"} />

    return (
        <SLearningContainer>
            <SLearningBoxTitle>Answer</SLearningBoxTitle>
            <SLearningContent>
                <Box margin={"auto 0"}>
                    {!props.isAnswerOpen
                        ? <Button
                            label={"Show answer"}
                            onClick={() => props.setIsAnswerOpen(true)}
                            withShadow
                        />
                        : checkAnswer
                            ? checkAnswer
                            : "no answer"
                    }
                </Box>
            </SLearningContent>
        </SLearningContainer>
    );
};
