import React, { FC, useState } from "react";
import Select, { TFilterOptions } from "../../../components/Select/Select";
import { SFilterReset, SFilterWrapper } from "./styled";
import { Box } from "../../../components/Box/Box";
import { SText } from "../../../components/Text/SText";
import Tabs, { TFilterTabs } from "../../../components/Tabs/Tabs";
import NumberOfCards from "./NumberOfCards";
import CloseButton from "../../../components/CloseButton/CloseButton";

export type TInitialFilters = {
    activeTab: TFilterTabs;
    sorting: TFilterOptions;
    numberOfCards: [number, number];
};

const initialFilters: TInitialFilters = {
    activeTab: "All",
    sorting: "",
    numberOfCards: [3, 7],
};

type TFilterProps = {
    setIsOpen: (isOpen: boolean) => void;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
};
const Filter: FC<TFilterProps> = (props) => {
    const options: TFilterOptions[] = ["Last Updated", "Number of cards"];

    const [option, setOption] = useState(initialFilters.sorting);

    const [value1, setValue1] = useState(initialFilters.numberOfCards[0]);
    const [value2, setValue2] = useState(initialFilters.numberOfCards[1]);

    return (
        <SFilterWrapper>
            <CloseButton color={"rgba(0, 0, 0, 0.5)"} onClick={() => props.setIsOpen(false)} />
            <Box flexDirection={"column"} gap={5}>
                <SText fontSize={"12px"} margin={"0 0 0 10px"} opacity={0.5}>
                    Sorting
                </SText>
                <Select
                    onBlur={props.onBlur}
                    id={"filter-select"}
                    options={options}
                    onChangeOption={setOption}
                    value={option}
                    placeholder={"Sort by"}
                />
            </Box>
            <NumberOfCards
                id={"filter-range"}
                onBlur={props.onBlur}
                setValue1={setValue1}
                setValue2={setValue2}
                value1={value1}
                value2={value2}
            />
            <Box flexDirection={"column"} gap={5}>
                <SText fontSize={"12px"} margin={"0 0 0 10px"} opacity={0.5}>
                    Filter
                </SText>
                <Box>
                    <Tabs initialFilters={initialFilters} />
                </Box>
                <SFilterReset>
                    <SText isLink>Reset</SText>
                </SFilterReset>
            </Box>
        </SFilterWrapper>
    );
};

export default Filter;
