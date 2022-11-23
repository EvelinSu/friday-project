import React, { FC, useEffect, useMemo } from "react";
import { STab, STabs } from "./styled";
import { setUserCardParams } from "../../../bll/packsParamsReducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";
import { TInitialFilters } from "../../pages/PacksPage/Filter/Filter";
import { getUrlParams } from "../../../common/utils/getUrlParams";

type TTabsProps = {
    initialFilters: TInitialFilters;
    tabs: string[];
    setTabs: (tabs: string[]) => void;
    setActiveTab: (tab: string) => void;
    activeTab: string;
};
const Tabs: FC<TTabsProps> = ({ setActiveTab, tabs, activeTab, setTabs }) => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const userId = useAppSelector((state) => state.auth.userData.id);
    const isFetching = useAppSelector((state) => state.app.isFetching);

    const onChangeTab = (tab: string) => {
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
                <STab
                    key={el}
                    onClick={() => onChangeTab(el)}
                    isActive={activeTab === el}
                    isDisabled={isFetching}
                >
                    {el}
                </STab>
            ))}
        </STabs>
    );
};

export default Tabs;
