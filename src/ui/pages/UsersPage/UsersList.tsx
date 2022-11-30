import React, { useMemo } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { GridBox, SGridDefaultBlock } from "../../components/GridBox/GridBox";
import { getCountArray } from "../../../common/utils/getCountArray";
import { baseTheme } from "../../styles/themes/baseTheme";
import { useSearchParams } from "react-router-dom";
import { getUrlParams } from "../../../common/utils/getUrlParams";
import { User } from "./User/User";

export const UsersList = () => {
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const users = useAppSelector((state) => state.users.usersData.users);
    const cardsSkeleton = getCountArray(Number(URLParams.pageCount) - users.length || 0).map((el) => (
        <SGridDefaultBlock minHeight={"145px"} key={el}></SGridDefaultBlock>
    ));

    const windowWidth = window.innerWidth;
    const rowsCount = URLParams.pageCount && +URLParams.pageCount > 8 ? +URLParams.pageCount / 4 : 4;
    const smallScreen = baseTheme.media.small;

    return (
        <GridBox
            columns={"repeat(auto-fill, minmax(250px, 1fr))"}
            style={{ flexGrow: windowWidth > smallScreen ? 1 : "" }}
            rows={
                windowWidth > smallScreen
                    ? `repeat(${rowsCount}, minmax(145px, 200px))`
                    : `repeat(auto-fit, 160px)`
            }
        >
            {users.map((user) => (
                <User key={user._id} user={user} />
            ))}
            {windowWidth > smallScreen && cardsSkeleton}
        </GridBox>
    );
};
