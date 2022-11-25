import React, { FC, useState } from "react";
import Select from "../../../components/Select/Select";
import { SFilterReset, SFilterWrapper } from "./styled";
import { SText } from "../../../components/Text/SText";
import Tabs from "../../../components/Tabs/Tabs";
import NumberOfCards from "./NumberOfCards";
import CloseButton from "../../../components/CloseButton/CloseButton";
import { useSearchParams } from "react-router-dom";
import { initialParams } from "../../../../common/utils/getUrlParams";
import { transformURLOption } from "../../../../common/utils/transformURLOption";
import { WithFormTitle } from "../../../components/Form/styled";
import { Box } from "../../../components/Box/Box";

export type TInitialFilters = {
    activeTab: string;
    sorting: string;
    numberOfCards: [number, number];
};

const initialFilters: TInitialFilters = {
    activeTab: "All",
    sorting: "",
    numberOfCards: [0, 10],
};

type TFilterProps = {
    setIsOpen: (isOpen: boolean) => void;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
};
const Filter: FC<TFilterProps> = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const options = ["Updated recently", "Updated long ago", "Few cards", "Lots of cards"];
    const currentOption = transformURLOption(searchParams.get("sortPacks"));
    const [option, setOption] = useState(currentOption || initialFilters.sorting);
    const [tabs, setTabs] = useState(["All", "My"]);
    const [activeTab, setActiveTab] = useState(initialFilters.activeTab);

    const onResetHandler = () => {
        setSearchParams(initialParams);
        setOption("");
    };

    return (
        <SFilterWrapper>
            <Box flexDirection={"column"} width={"100%"}>
                <CloseButton color={"rgba(0, 0, 0, 0.5)"} onClick={() => props.setIsOpen(false)} />
                <WithFormTitle title={"Sorting"}>
                    <Select
                        onBlur={props.onBlur}
                        id={"filter-select"}
                        options={options}
                        onChangeOption={setOption}
                        value={option}
                        placeholder={"Sort by"}
                    />
                </WithFormTitle>
                <NumberOfCards id={"filter-range"} onBlur={props.onBlur} />
                <WithFormTitle title={"Filter"}>
                    <Tabs
                        initialFilters={initialFilters}
                        tabs={tabs}
                        setTabs={setTabs}
                        setActiveTab={setActiveTab}
                        activeTab={activeTab}
                    />
                </WithFormTitle>
                <SFilterReset>
                    <SText onClick={onResetHandler} isLink>
                        Reset
                    </SText>
                </SFilterReset>
            </Box>
        </SFilterWrapper>
    );
};

export default Filter;
