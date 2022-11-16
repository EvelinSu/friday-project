import React, { FC, useState } from "react";
import Select from "../../../components/Select/Select";
import { SFilterReset, SFilterWrapper } from "./styled";
import { Box } from "../../../components/Box/Box";
import { SText } from "../../../components/Text/SText";
import Tabs from "../../../components/Tabs/Tabs";
import NumberOfCards from "./NumberOfCards";
import CloseButton from "../../../components/CloseButton/CloseButton";

const initialFilters = {
    activeTab: "All",
    sorting: "",
    numberOfCards: [3, 7],
};

type TFilterProps = {
    setIsOpen: (isOpen: boolean) => void;
};
const Filter: FC<TFilterProps> = (props) => {
    const options = ["Last Updated", "Number of cards"];
    const tabs = ["All", "Only my"];

    const [option, setOption] = useState(initialFilters.sorting);
    const [activeTab, setActiveTab] = useState(initialFilters.activeTab);

    const [value1, setValue1] = useState(initialFilters.numberOfCards[0]);
    const [value2, setValue2] = useState(initialFilters.numberOfCards[1]);

    const onChangeTab = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <SFilterWrapper>
            <CloseButton color={"rgba(0, 0, 0, 0.5)"} onClick={() => props.setIsOpen(false)} />
            <Box flexDirection={"column"} gap={5}>
                <SText fontSize={"12px"} margin={"0 0 0 10px"} opacity={0.5}>
                    Sorting
                </SText>
                <Select
                    options={options}
                    onChangeOption={setOption}
                    value={option}
                    placeholder={"Sort by"}
                />
            </Box>
            <NumberOfCards setValue1={setValue1} setValue2={setValue2} value1={value1} value2={value2} />
            <Box flexDirection={"column"} gap={5}>
                <SText fontSize={"12px"} margin={"0 0 0 10px"} opacity={0.5}>
                    Filter
                </SText>
                <Box>
                    <Tabs values={tabs} activeTab={activeTab} setActiveTab={onChangeTab} />
                </Box>
                <SFilterReset>
                    <SText isLink>Reset</SText>
                </SFilterReset>
            </Box>
        </SFilterWrapper>
    );
};

export default Filter;
