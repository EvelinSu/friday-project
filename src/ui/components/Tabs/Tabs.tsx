import React, { FC, useEffect, useState } from "react";
import { STab, STabs } from "./styled";
import { setUserCardParams } from "../../../bll/packsParamsReducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";
import { TInitialFilters } from "../../pages/PacksList/Filter/Filter";

export type TFilterTabs = "All" | "Only my";

type TTabsProps = {
    initialFilters: TInitialFilters;
};
const Tabs: FC<TTabsProps> = ({ initialFilters }) => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const tabs: TFilterTabs[] = ["All", "Only my"];

    const userId = useAppSelector((state) => state.auth.userData.id);
    const urlUserId = searchParams.get("user_id");

    const [activeTab, setActiveTab] = useState(initialFilters.activeTab);

    const onChangeTab = (tab: TFilterTabs) => {
        if (userId) {
            setSearchParams(tab === "Only my" ? { user_id: userId } : "");
            dispatch(setUserCardParams({ user_id: userId }));
        }
    };

    useEffect(() => {
        urlUserId === userId ? setActiveTab("Only my") : setActiveTab("All");
    }, [urlUserId, userId]);

    return (
        <STabs>
            {tabs.map((el) => (
                <STab key={el} onClick={() => onChangeTab(el)} isActive={activeTab === el}>
                    {el}
                </STab>
            ))}
        </STabs>
    );
};

export default Tabs;
