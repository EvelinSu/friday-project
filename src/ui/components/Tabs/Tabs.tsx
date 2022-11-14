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
            {props.values.map((el) => (
                <STab
                    onClick={() => props.setActiveTab(el)}
                    isActive={props.activeTab === el}
                    key={el}
                >
                    {el}
                </STab>
            ))}
        </STabs>
    );
};

export default Tabs;
