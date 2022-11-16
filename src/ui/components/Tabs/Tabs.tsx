import React, { FC } from "react";
import { STab, STabs } from "./styled";

type TTabsProps = {
    values: string[];
    setActiveTab: (tab: string) => void;
    activeTab: string;
};
const Tabs: FC<TTabsProps> = (props) => {
    return (
        <STabs>
            <STab onClick={() => props.setActiveTab("All")} isActive={props.activeTab === "All"}>
                All
            </STab>
            <STab onClick={() => props.setActiveTab("Only my")} isActive={props.activeTab === "Only my"}>
                Only my
            </STab>
        </STabs>
    );
};

export default Tabs;
