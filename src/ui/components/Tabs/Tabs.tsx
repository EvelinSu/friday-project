import React, { FC } from "react";
import { STab, STabs } from "./styled";
import { TCommonFilterTabs } from "../Filter/Filter";

type TTabsProps = {
    tabs: TCommonFilterTabs[];
    onTabClickHandler: (tab: TCommonFilterTabs) => void;
    activeTab: TCommonFilterTabs;
    isDisabled: boolean;
};
const Tabs: FC<TTabsProps> = ({ tabs, onTabClickHandler, activeTab, isDisabled }) => {
    return (
        <STabs>
            {tabs.map((el) => (
                <STab
                    key={el}
                    onClick={() => onTabClickHandler(el)}
                    isActive={activeTab === el}
                    isDisabled={isDisabled}
                >
                    {el}
                </STab>
            ))}
        </STabs>
    );
};

export default Tabs;
