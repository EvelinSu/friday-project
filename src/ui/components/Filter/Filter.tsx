import React, { FC, useEffect, useMemo, useState } from "react";
import Select from "../Select/Select";
import { SFilterContainer, SFilterReset, SFilterWrapper } from "./styled";
import { SText } from "../Text/SText";
import Tabs from "../Tabs/Tabs";
import Range from "./Range";
import CloseButton from "../CloseButton/CloseButton";
import { useSearchParams } from "react-router-dom";
import { WithFormTitle } from "../Form/styled";
import { Box } from "../Box/Box";
import FilterIcon from "../../assets/icons/FilterIcon";
import IconButton from "../IconButton/IconButton";
import { TCardsFilterOptions, TCardsFilterTabs } from "../../pages/CardsPage/Filter/CardsFilter";
import { TPacksFilterOptions, TPacksFilterTabs } from "../../pages/PacksPage/Filter/PacksFilter";
import { useAppSelector } from "../../../hooks/hooks";
import { getUrlParams } from "../../../common/utils/getUrlParams";

export type TInitialFilters = {
    activeTab: string;
    sorting: string;
    numberOfCards: [number, number];
};

export type TCommonFilterTabs = TPacksFilterTabs | TCardsFilterTabs | "";
export type TCommonFilterOptions = TPacksFilterOptions | TCardsFilterOptions | "";

type TFilterProps = {
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
    options: TCommonFilterOptions[];
    currentOption: TCommonFilterOptions;
    tabs?: TCommonFilterTabs[];
    activeTab?: TCommonFilterTabs;
    onTabClickHandler: (tab: TCommonFilterTabs) => void;
    initialParams: string;
    minmax: [number, number];
    rangeText: string;
    addSortToURL: (option: any) => void;
};
const Filter: FC<TFilterProps> = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const [option, setOption] = useState<TCommonFilterOptions>(props.currentOption || "");
    const isFetching = useAppSelector((state) => state.app.isFetching);

    const onResetHandler = () => {
        setSearchParams(props.initialParams);
        setOption("");
    };

    const onFilterBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
        if (e.relatedTarget?.id.includes("filter")) return;
        setIsFilterOpen(false);
    };

    useEffect(() => {
        if (option !== "") props.addSortToURL(option);
        if (option === "") {
            delete URLParams.sortPacks;
            delete URLParams.sortCards;
            setSearchParams(URLParams);
        }
    }, [option]);

    return (
        <SFilterWrapper
            id={"filter"}
            tabIndex={0}
            onBlur={onFilterBlurHandler}
            margin={"0 0 3px 0"}
            isActive={`?${searchParams}`.length > props.initialParams.length + 5}
        >
            <IconButton
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                icon={<FilterIcon />}
                title={"Filter"}
                isLightest
            />
            {isFilterOpen && (
                <SFilterContainer>
                    <Box flexDirection={"column"} width={"100%"}>
                        <CloseButton
                            color={"rgba(0, 0, 0, 0.5)"}
                            onClick={() => setIsFilterOpen(false)}
                        />
                        <WithFormTitle title={"Sorting"}>
                            <Select
                                onBlur={props.onBlur}
                                id={"filter-select"}
                                options={props.options}
                                onChangeOption={setOption}
                                value={option}
                                placeholder={"Sort by"}
                                isDisabled={isFetching}
                            />
                        </WithFormTitle>
                        <Range
                            id={"filter-range"}
                            isDisabled={isFetching}
                            onBlur={props.onBlur}
                            minmax={props.minmax}
                            title={props.rangeText}
                        />
                        {props.tabs ? (
                            <WithFormTitle title={"Filter"}>
                                <Tabs
                                    onTabClickHandler={props.onTabClickHandler}
                                    tabs={props.tabs}
                                    activeTab={props.activeTab ? props.activeTab : props.tabs[0]}
                                    isDisabled={isFetching}
                                />
                            </WithFormTitle>
                        ) : (
                            <Box></Box>
                        )}
                        <SFilterReset>
                            <SText onClick={onResetHandler} isLink>
                                Reset
                            </SText>
                        </SFilterReset>
                    </Box>
                </SFilterContainer>
            )}
        </SFilterWrapper>
    );
};

export default Filter;
