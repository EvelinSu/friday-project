import React, { useMemo } from "react";
import Filter from "../../../components/Filter/Filter";
import { transformToURLOption, transformURLOption } from "../../../../common/utils/transformURLOption";
import { useSearchParams } from "react-router-dom";
import { getUrlParams, initialObjectParams } from "../../../../common/utils/getUrlParams";
import { useAppSelector } from "../../../../hooks/hooks";

export type TCardsFilterOptions =
    | "Updated recently"
    | "Updated long ago"
    | "High rating"
    | "Low rating"
    | "";
export type TCardsFilterTabs = "Images" | "Text";
// const tabs: TCardsFilterTabs[] = ["Images", "Text"];

export const CardsFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const options: TCardsFilterOptions[] = [
        "Updated recently",
        "Updated long ago",
        "High rating",
        "Low rating",
    ];
    const currentOption = transformURLOption(searchParams.get("sortCards"));

    const minGrade = useAppSelector((state) => state.cards.cardsData.minGrade);
    const maxGrade = useAppSelector((state) => state.cards.cardsData.maxGrade);

    const onTabClickHandler = (tab: string) => {
        setSearchParams({ ...initialObjectParams, tab });
    };

    const addSortToURL = (option: TCardsFilterOptions) => {
        setSearchParams({ ...URLParams, sortCards: transformToURLOption(option) });
    };
    const initialCardParams = { ...initialObjectParams, cardsPack_id: URLParams.cardsPack_id };

    return (
        <Filter
            options={options}
            currentOption={currentOption}
            onTabClickHandler={onTabClickHandler}
            initialParams={initialCardParams}
            minmax={[minGrade, maxGrade - 1]}
            rangeText={"Rating"}
            addSortToURL={addSortToURL}
        />
    );
};
