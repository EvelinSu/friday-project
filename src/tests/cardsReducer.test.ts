import {
    cardsReducer,
    incQuestionCount,
    initialCardsData,
    setIsLearning,
    TCardsState,
} from "../bll/cardsReducer";
import { TCard } from "../dal/ResponseTypes";

let startState = {} as TCardsState;

beforeEach(() => {
    startState = {
        isButtonsDisabled: false,
        cardsData: initialCardsData,
        currentCard: {} as TCard,
        questionCount: 0,
        isLearning: false,
    };
});

test("setIsLoggedIn should be added with status true", () => {
    const action = setIsLearning(true);

    const endState = cardsReducer(startState, action);
    expect(endState.isLearning).toBe(true);
});

test("questionCount should be ", () => {
    const action = incQuestionCount();

    const endState = cardsReducer(startState, action);
    expect(endState.questionCount).toBe(1);
});
