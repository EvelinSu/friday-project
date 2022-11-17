import React, { FC, useEffect, useMemo, useState } from "react";
import { STab, STabs } from "./styled";
import { setUserCardParams } from "../../../bll/packsParamsReducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";
import { TInitialFilters } from "../../pages/PacksList/Filter/Filter";
import { getUrlPacksParams } from "../../../common/utils/getActualParams";

export type TFilterTabs = "All" | "My" | "Other";

type TTabsProps = {
    initialFilters: TInitialFilters;
};
const Tabs: FC<TTabsProps> = ({ initialFilters }) => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlPacksParams(searchParams), [searchParams]);

    const [tabs, setTabs] = useState<TFilterTabs[]>(["All", "My"]);
    const [activeTab, setActiveTab] = useState(initialFilters.activeTab);

    const userId = useAppSelector((state) => state.auth.userData.id);

    const onChangeTab = (tab: TFilterTabs) => {
        if (userId) {
            dispatch(setUserCardParams({ page: "1", pageCount: URLParams.pageCount, user_id: userId }));
            setSearchParams(
                tab === "My"
                    ? {
                          page: `1`,
                          pageCount: `${URLParams.pageCount}`,
                          user_id: userId,
                      }
                    : { page: `1`, pageCount: `${URLParams.pageCount}` }
            );
        }
        if (tabs.includes("Other")) setTabs(["All", "My"]);
    };

    const isOtherUserId = () => {
        setActiveTab("Other");
        setTabs(["All", "My", "Other"]);
    };

    useEffect(() => {
        URLParams.user_id === userId
            ? setActiveTab("My")
            : URLParams.user_id && URLParams.user_id !== userId
            ? isOtherUserId()
            : setActiveTab("All");
    }, [URLParams, userId]);

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
