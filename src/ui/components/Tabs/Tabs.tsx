import React, { FC, useEffect, useState } from "react";
import { STab, STabs } from "./styled";
import { setUserCardParams } from "../../../bll/packsParamsReducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";
import { TInitialFilters } from "../../pages/PacksList/Filter/Filter";
import { getActualPacksParams } from "../../../common/utils/getActualParams";

export type TFilterTabs = "All" | "My" | "Other";

type TTabsProps = {
    initialFilters: TInitialFilters;
};
const Tabs: FC<TTabsProps> = ({ initialFilters }) => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [tabs, setTabs] = useState<TFilterTabs[]>(["All", "My"]);

    const userId = useAppSelector((state) => state.auth.userData.id);
    const actualUrlParams = getActualPacksParams(searchParams);
    const urlUserId = searchParams.get("user_id");

    const [activeTab, setActiveTab] = useState(initialFilters.activeTab);

    const onChangeTab = (tab: TFilterTabs) => {
        if (userId) {
            dispatch(setUserCardParams({ user_id: userId }));
            setSearchParams(
                tab === "My"
                    ? {
                          page: `1`,
                          page_count: `${actualUrlParams.pageCount}`,
                          user_id: userId,
                      }
                    : `?page=1&page_count=${actualUrlParams.pageCount}`
            );
        }
        if (tabs.includes("Other")) setTabs(["All", "My"]);
    };
    console.log(searchParams);

    const isOtherUserId = () => {
        setActiveTab("Other");
        setTabs(["All", "My", "Other"]);
    };

    useEffect(() => {
        urlUserId === userId
            ? setActiveTab("My")
            : urlUserId && urlUserId !== userId
            ? isOtherUserId()
            : setActiveTab("All");
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
