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
    loadCards,
    setCurrentCard,
    setIsLearning,
    uploadGrade,
} from "../../../bll/cardsReducer";
import { PATH } from "../Pages";
import BackPageButton from "../../components/BackPageButton/BackPageButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUrlParams } from "../../../common/utils/getUrlParams";
import { GridBox } from "../../components/GridBox/GridBox";
import { Grades } from "./Grades";
import LoaderIcon from "../../assets/loaders/loader";
import { TCard } from "../../../dal/ResponseTypes";
import { Answer } from "./Answer";
import { Question } from "./Question";

export const LearningPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const name = useAppSelector((state) => state.cards.cardsData.packName);
    const cardsParams = useAppSelector((state) => state.URLParams.cardsParams);
    const cards = useAppSelector((state) => state.cards.cardsData.cards);
    const currentCard = useAppSelector((state) => state.cards.currentCard);
    const questionCount = useAppSelector((state) => state.cards.questionCount);
    const isFetching = useAppSelector((state) => state.app.isFetching);
    const isLearning = useAppSelector((state) => state.cards.isLearning);

    const [card, setCard] = useState<TCard>(currentCard);
    const [isAnswerOpen, setIsAnswerOpen] = useState(false);
    const [grade, setGrade] = useState(1);

    const finishLearnHandler = () => {
        dispatch(setIsLearning(false));
        dispatch(setCurrentCard(initialCardsData.cards[0]));
    };

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
        dispatch(loadCards(URLParams)).then(() => {
            if (!card?._id) {
                const newCard = getCard(cards);
                dispatch(setCurrentCard(newCard));
                setCard(newCard);
            }
        });
    }, []);

    if (!cards.length || !isLearning) {
        navigate(PATH.cardsList + `?cardsPack_id=${URLParams.cardsPack_id}`);
    }

    const checkQuestion = card?.question && card.question !== "no question" ? card.question : "";
    const checkAnswer = card?.answer && card.answer !== "no answer" ? card.answer : "";

    return (
        <SPageWrapper>
            <BackPageButton
                to={PATH.cardsList + `cardsPack_id=${URLParams.cardsPack_id}`}
                params={cardsParams}
                label={"Finish and back to cards"}
                onClick={finishLearnHandler}
            />
            <UiBox
                overflow={"auto"}
                title={`Learn "${name}"`}
                maxWidth={"700px"}
                margin={"5vh auto 0 auto"}
            >
                {isFetching && <LoaderIcon shadow absolute />}
                <Box flexDirection={"column"}>
                    <GridBox columns={"repeat(auto-fill, minmax(220px, 1fr))"}>
                        <Question checkQuestion={checkQuestion} questionImg={card?.questionImg} />
                        <Answer
                            checkAnswer={checkAnswer}
                            setIsAnswerOpen={setIsAnswerOpen}
                            isAnswerOpen={isAnswerOpen}
                            answerImg={card?.answerImg}
                        />
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
                    <Box flexDirection={"column"} alignItems={"center"}>
                        <SText textAlign={"center"} fontSize={"16px"}>
                            Rate yourself
                        </SText>
                        <Grades setGrade={setGrade} grade={grade} />
                        <Button
                            isLoading={isFetching}
                            label={"Next"}
                            onClick={onNextHandler}
                            withShadow
                        />
                    </Box>
                </Box>
            </UiBox>
        </SPageWrapper>
    );
};
