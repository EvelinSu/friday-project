import { TCard } from "../../dal/ResponseTypes";

export const getCard = (cards: TCard[]): TCard => {
    const maxGradeValue = 6;

    const sum = cards.reduce(
        (acc, card) => acc + (maxGradeValue - card.grade) * (maxGradeValue - card.grade),
        0
    );
    const rand = Math.random() * sum;
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum = acc.sum + (maxGradeValue - card.grade) * (maxGradeValue - card.grade);

            return { sum: newSum, id: newSum < rand ? i : acc.id };
        },
        { sum: 0, id: -1 }
    );

    return cards[res.id + 1];
};
