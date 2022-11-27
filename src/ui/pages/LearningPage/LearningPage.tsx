import React, { useEffect, useMemo, useState } from "react";
import { UiBox } from "../../components/UiBox/UiBox";
import { SPageWrapper } from "../styled";
import { Box } from "../../components/Box/Box";
import { SText } from "../../components/Text/SText";
import Button from "../../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getCard } from "../../../common/utils/getCards";
import {
    incQuestionCount,
    initialCardsData,
    setCurrentCard,
    setIsLearning,
    uploadGrade,
} from "../../../bll/cardsReducer";
import { PATH } from "../Pages";
import BackPageButton from "../../components/BackPageButton/BackPageButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUrlParams } from "../../../common/utils/getUrlParams";
import { LearningImage, SLearningBoxTitle, SLearningContainer, SLearningContent } from "./styled";
import { GridBox } from "../../components/GridBox/GridBox";
import { Grades } from "./Grades";
import LoaderIcon from "../../assets/loaders/loader";
import { TCard } from "../../../dal/ResponseTypes";

export const LearningPage = () => {
    const dispatch = useAppDispatch();
    const name = useAppSelector((state) => state.cards.cardsData.packName);
    const cardsParams = useAppSelector((state) => state.URLParams.cardsParams);
    const finishLearnHandler = () => {
        dispatch(setIsLearning(false));
        dispatch(setCurrentCard(initialCardsData.cards[0]));
    };

    return (
        <SPageWrapper>
            <BackPageButton
                to={PATH.cardsList}
                params={cardsParams}
                label={"Finish and back to cards"}
                onClick={finishLearnHandler}
            />
            <Box justifyContent={"center"}>
                <Box
                    margin={"0 0 20px 0"}
                    width={"100%"}
                    maxWidth={"700px"}
                    overflow={"hidden"}
                    height={"100%"}
                >
                    <UiBox width={"100%"} title={`Learn "${name}"`} body={<LearnPackContainer />} />
                </Box>
            </Box>
        </SPageWrapper>
    );
};

const LearnPackContainer = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);
    const cards = useAppSelector((state) => state.cards.cardsData.cards);
    const currentCard = useAppSelector((state) => state.cards.currentCard);
    const questionCount = useAppSelector((state) => state.cards.questionCount);
    const isFetching = useAppSelector((state) => state.app.isFetching);
    const isLearning = useAppSelector((state) => state.cards.isLearning);
    const navigate = useNavigate();

    const [card, setCard] = useState<TCard>(currentCard);
    const [isAnswerOpen, setIsAnswerOpen] = useState(false);
    const [grade, setGrade] = useState(1);

    const onNextHandler = async () => {
        const newCard = await getCard(cards);
        await dispatch(uploadGrade({ grade, card_id: card._id }));
        dispatch(setCurrentCard(newCard));
        dispatch(incQuestionCount());
        setCard(newCard);
        setGrade(1);
        setIsAnswerOpen(false);
    };

    useEffect(() => {
        if (!card?._id) {
            const newCard = getCard(cards);
            dispatch(setCurrentCard(newCard));
            setCard(newCard);
        }
    }, []);

    if (!cards.length || !isLearning) {
        navigate(PATH.cardsList + `?cardsPack_id=${URLParams.cardsPack_id}`);
    }

    const checkQuestion = card?.question && card.question !== "no question" ? card.question : "";
    const checkAnswer = card?.answer && card.answer !== "no answer" ? card.answer : "";

    return (
        <Box flexDirection={"column"} position={"relative"}>
            {isFetching && <LoaderIcon absolute />}
            <GridBox columns={"repeat(auto-fill, minmax(220px, 1fr))"}>
                <SLearningContainer>
                    <SLearningBoxTitle>Question</SLearningBoxTitle>
                    <SLearningContent>
                        <Box margin={"auto 0"}>
                            {checkQuestion || <LearningImage src={card?.questionImg} alt={"question"} />}
                        </Box>
                    </SLearningContent>
                </SLearningContainer>
                <SLearningContainer>
                    <SLearningBoxTitle>Answer</SLearningBoxTitle>
                    <SLearningContent>
                        <Box margin={"auto 0"}>
                            {!isAnswerOpen ? (
                                <Button
                                    label={"Show answer"}
                                    onClick={() => setIsAnswerOpen(true)}
                                    withShadow
                                />
                            ) : (
                                checkAnswer || <LearningImage src={card?.answerImg} alt={"answer"} />
                            )}
                        </Box>
                    </SLearningContent>
                </SLearningContainer>
            </GridBox>
            <Box flexDirection={"column"} gap={10}>
                <SText>
                    <SText opacity={0.3} margin={"0 5px 0 0"}>
                        Total answers to this question:
                    </SText>
                    {card?.shots}
                </SText>
                <SText>
                    <SText opacity={0.3} margin={"0 5px 0 0"}>
                        Total answers in this session:
                    </SText>
                    {questionCount}
                </SText>
            </Box>
            <SText textAlign={"center"} fontSize={"16px"}>
                Rate yourself
            </SText>
            <Box gap={"10px"} flexDirection={"column"}>
                <Grades setGrade={setGrade} grade={grade} />
            </Box>
            <Box justifyContent={"center"}>
                <Button isLoading={isFetching} label={"Next"} onClick={onNextHandler} withShadow />
            </Box>
        </Box>
    );
};
