import React, { useEffect, useMemo, useState } from "react";
import { Box } from "../../components/Box/Box";
import LoaderIcon from "../../assets/loaders/loader";
import Pagination from "../../components/Pagination/Pagination";
import { PageCountDropdown } from "../../components/PageCountDropdown/PageCountDropdown";
import { SPageWrapper } from "../styled";
import UsersPagePanel from "./UsersPagePanel/UsersPagePanel";
import { getUrlParams } from "../../../common/utils/getUrlParams";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setPacksParams } from "../../../bll/paramsReducer";
import { UsersNotFound } from "./UsersNotFound/UsersNotFound";
import { UsersList } from "./UsersList";
import { loadUsers } from "../../../bll/usersReducer";

export const UsersPage = () => {
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);
    const isFetching = useAppSelector((state) => state.app.isFetching);
    const [pageCount, setPageCount] = useState(+(URLParams.pageCount || 0));

    const usersTotalCount = useAppSelector((state) => state.users.usersData.usersTotalCount);
    const users = useAppSelector((state) => state.users.usersData.users);
    const pageCounts = [12, 16, 20, 24, 28, 32, 36, 40, 44, 48];

    const onChangePageCountHandler = (count: number) => {
        setSearchParams({ ...URLParams, pageCount: `${count}` });
    };

    useEffect(() => {
        setPageCount(+(URLParams.pageCount || 0));
        dispatch(setPacksParams(URLParams));
        dispatch(loadUsers(URLParams));
    }, [URLParams]);

    return (
        <SPageWrapper>
            <UsersPagePanel />
            <Box flexGrow={1} position={"relative"} overflow={"hidden"}>
                {isFetching && <LoaderIcon borderRadius={"20px"} absolute />}
                {users.length > 0 ? <UsersList /> : <UsersNotFound isUsersFetching={isFetching} />}
            </Box>
            <Box alignItems={"center"} margin="auto 0 10px 0">
                <Box overflow={"auto"}>
                    <Pagination
                        totalCount={usersTotalCount}
                        isFetching={isFetching}
                        pageCount={pageCount}
                    />
                </Box>
                <PageCountDropdown
                    pageCounts={pageCounts}
                    onClick={onChangePageCountHandler}
                    activeCount={pageCount}
                    isDisabled={isFetching}
                />
            </Box>
        </SPageWrapper>
    );
};
