import React, {useMemo} from "react";
import Filter from "../../../components/Filter/Filter";
import {
    transformToURLOption,
    transformURLOption,
    TSortOptions,
    TURLSortOptions
} from "../../../../common/utils/transformURLOption";
import {useSearchParams} from "react-router-dom";
import {getUrlParams, initialObjectParams, initialStringParams,} from "../../../../common/utils/getUrlParams";
import {useAppSelector} from "../../../../hooks/hooks";

const options: Array<keyof TSortOptions> = [
    "Updated recently",
    "Updated long ago",
    "High rating",
    "Low rating",
];

export const CardsFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const minGrade = useAppSelector((state) => state.cards.cardsData.minGrade);
    const maxGrade = useAppSelector((state) => state.cards.cardsData.maxGrade);

    const onTabClickHandler = (tab: string) => {
        setSearchParams({...initialObjectParams, tab});
    };

    const addSortToURL = (option: keyof TSortOptions) => {
        setSearchParams({...URLParams, sortCards: transformToURLOption(option)});
    };

    const currentOption = transformURLOption(searchParams.get("sortCards") as keyof TURLSortOptions);
    const initialCardParams = {...initialObjectParams, cardsPack_id: URLParams.cardsPack_id};

    return (
        <Filter
            options={options}
            currentOption={currentOption}
            onTabClickHandler={onTabClickHandler}
            initialParams={initialCardParams}
            minmax={[minGrade, maxGrade - 1]}
            rangeText={"Rating"}
            addSortToURL={addSortToURL}
            defaultURL={initialStringParams + `cardsPack_id=${URLParams.cardsPack_id}`}
        />
    );
};

export type TCardsFilterTabs = "Images" | "Text";
