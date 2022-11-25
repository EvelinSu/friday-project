import React, { useState } from "react";
import { UiBox } from "../../components/UiBox/UiBox";
import { SPageWrapper } from "../styled";
import { Box } from "../../components/Box/Box";
import { SText } from "../../components/Text/SText";
import Button from "../../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getCard } from "../../../common/utils/getCards";
import { Grades } from "./Grades";

export const LearningPage = () => {
    const name = useAppSelector((state) => state.cards.cardsData.packName);

    return (
        <SPageWrapper>
            <Box justifyContent={"center"} padding={"10vh 0 0"}>
                <UiBox title={`Learn "${name}"`} body={<LearnPackContainer />} width={"500px"} />
            </Box>
        </SPageWrapper>
    );
};

const LearnPackContainer = () => {
    const dispatch = useAppDispatch();
    const cards = useAppSelector((state) => state.cards.cardsData.cards);
    const [card, setCars] = useState(getCard(cards));
    const [isAnswerOpen, setIsAnswerOpen] = useState(false);
    const [grade, setGrade] = useState(1);
    console.log(grade);
    console.log(card);
    const onNextHandler = () => {};

    return (
        <Box flexDirection={"column"} gap={"10px"}>
            <SText fontSize={"16px"}>
                <SText fontWeight={600}>Question: </SText>
                {card.question}
            </SText>
            <SText>
                <SText opacity={0.3} margin={"0 5px 0 0"}>
                    Количество попыток ответов на вопрос:
                </SText>
                {card.shots}
            </SText>
            {!isAnswerOpen && (
                <Box justifyContent={"center"} margin={"20px 0 0 0"}>
                    <Button label={"Show answer"} onClick={() => setIsAnswerOpen(true)} withShadow />
                </Box>
            )}
            {isAnswerOpen && (
                <Box margin={"20px 0 0 0"} flexDirection={"column"} width={"100%"}>
                    <SText fontSize={"16px"}>
                        <SText fontWeight={600}>Answer: </SText>
                        {card.answer}
                    </SText>
                    <SText margin={"10px 0 0 0"} fontSize={"16px"}>
                        Rate yourself:
                    </SText>
                    <Box gap={"10px"} flexDirection={"column"}>
                        <Grades setGrade={setGrade} grade={grade} />
                    </Box>
                    <Box justifyContent={"center"}>
                        <Button label={"Next"} withShadow onClick={onNextHandler} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};
