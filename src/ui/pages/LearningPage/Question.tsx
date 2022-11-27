import React, { FC } from "react";
import { LearningImage, SLearningBoxTitle, SLearningContainer, SLearningContent } from "./styled";
import { Box } from "../../components/Box/Box";

type TQuestionProps = {
    checkQuestion: string;
    questionImg: string;
};
export const Question: FC<TQuestionProps> = (props) => {
    return (
        <SLearningContainer>
            <SLearningBoxTitle>Question</SLearningBoxTitle>
            <SLearningContent>
                <Box margin={"auto 0"}>
                    {props.checkQuestion || <LearningImage src={props.questionImg} alt={"question"} />}
                </Box>
            </SLearningContent>
        </SLearningContainer>
    );
};

