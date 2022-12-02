import React, { useEffect, useMemo, useState } from "react";
import Filter from "../../../components/Filter/Filter";
import { useSearchParams } from "react-router-dom";
import { setUserCardParams } from "../../../../bll/paramsReducer";
import {
    getUrlParams,
    initialObjectParams,
    initialStringParams,
} from "../../../../common/utils/getUrlParams";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { transformToURLOption, transformURLOption } from "../../../../common/utils/transformURLOption";

export type TPacksFilterOptions =
    | "Updated recently"
    | "Updated long ago"
    | "Few cards"
    | "Lots of cards"
    | "";
const options: TPacksFilterOptions[] = [
    "Updated recently",
    "Updated long ago",
    "Few cards",
    "Lots of cards",
];

export type TPacksFilterTabs = "All" | "My" | "Other";

export const PacksFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);
    const [tabs, setTabs] = useState<TPacksFilterTabs[]>(["All", "My"]);

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const userId = useAppSelector((state) => state.auth.myData.id);
    const minCardsCount = useAppSelector((state) => state.packs.cardPacksData.minCardsCount);
    const maxCardsCount = useAppSelector((state) => state.packs.cardPacksData.maxCardsCount);

    const currentOption = transformURLOption(searchParams.get("sortPacks"));

    const onTabClickHandler = (tab: string) => {
        const userPackParams: any = {
            page: 1,
            pageCount: URLParams.pageCount,
            user_id: userId,
        };
        if (userId) {
            dispatch(setUserCardParams(userPackParams.user_id));
            setSearchParams(tab === "My" ? userPackParams : { page: 1, pageCount: URLParams.pageCount });
        }
        if (tabs.includes("Other")) setTabs(["All", "My"]);
    };

    const isOtherUserId = () => {
        setActiveTab("Other");
        setTabs(["All", "My", "Other"]);
    };

    const addSortToURL = (option: TPacksFilterOptions) => {
        setSearchParams({ ...URLParams, sortPacks: transformToURLOption(option) });
    };

    useEffect(() => {
        URLParams.user_id === userId
            ? setActiveTab("My")
            : URLParams.user_id && URLParams.user_id !== userId
            ? isOtherUserId()
            : setActiveTab("All");
    }, [URLParams, userId]);

    return (
        <Filter
            options={options}
            tabs={tabs}
            onTabClickHandler={onTabClickHandler}
            activeTab={activeTab}
            currentOption={currentOption}
            initialParams={initialObjectParams}
            minmax={[minCardsCount, maxCardsCount]}
            rangeText={"Number of cards"}
            addSortToURL={addSortToURL}
            defaultURL={initialStringParams}
        />
    );
};
