import React, {useState} from 'react';
import {UiBox} from "../../components/UiBox/UiBox";
import {SPageWrapper} from "../styled";
import {Box} from "../../components/Box/Box";
import {SText} from "../../components/Text/SText";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";

const pack = {
    name: "Meow",
    cards: [
        {
            question: 'How "This" works in JavaScript?',
            answer: 'This is how "This" works in JavaScript',
            count: 10,
        }
    ]
}

export const LearningPage = () => {

    return (
        <SPageWrapper>
            <Box justifyContent={"center"} padding={"10vh 0 0"}>
                <UiBox title={`Learn "${pack.name}"`} body={<LearnPackContainer />} width={"500px"} />
            </Box>
        </SPageWrapper>
    );
};

const LearnPackContainer = () => {

    const [isAnswerOpen, setIsAnswerOpen] = useState(false)

    return (
        <Box flexDirection={"column"} gap={"10px"}>
            <SText fontSize={"16px"}>
                <SText fontWeight={600}>Question: </SText>
                {pack.cards[0].question}
            </SText>
            <SText>
                <SText opacity={0.3} margin={"0 5px 0 0"}>
                    Количество попыток ответов на вопрос:
                </SText>
                {pack.cards[0].count}
            </SText>
            {!isAnswerOpen && (
                <Box justifyContent={"center"} margin={"20px 0 0 0"}>
                    <Button
                        label={"Show answer"}
                        onClick={() => setIsAnswerOpen(true)}
                        withShadow
                    />
                </Box>
            )}
            {isAnswerOpen && (
                <Box
                    margin={"20px 0 0 0"}
                    flexDirection={"column"}
                    width={"100%"}
                >
                    <SText fontSize={"16px"}>
                        <SText fontWeight={600}>Answer: </SText>
                        {pack.cards[0].answer}
                    </SText>
                    <SText margin={"10px 0 0 0"} fontSize={"16px"}>
                        Rate yourself:
                    </SText>
                    <Box gap={"10px"} flexDirection={"column"}>
                        <Checkbox label={"Did not know"} />
                        <Checkbox label={"Forgot"} />
                        <Checkbox label={"A lot of thought"} />
                        <Checkbox label={"Сonfused"} />
                        <Checkbox label={"Knew the answer"} />
                    </Box>
                    <Box justifyContent={"center"}>
                        <Button label={"Next"} withShadow />
                    </Box>
                </Box>
            )}
        </Box>
    )
}
