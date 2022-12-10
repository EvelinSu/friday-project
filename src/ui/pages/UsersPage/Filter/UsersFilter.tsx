import React, {useMemo} from "react";
import Filter from "../../../components/Filter/Filter";
import {
    transformToURLOption,
    transformURLOption,
    TSortOptions,
    TURLSortOptions
} from "../../../../common/utils/transformURLOption";
import {useSearchParams} from "react-router-dom";
import {getUrlParams, initialObjectParams, initialStringParams,} from "../../../../common/utils/getUrlParams";
import {useAppSelector} from "../../../../hooks/hooks";

const options: Array<keyof TSortOptions> = ["Lot of packs", "Few packs", "New users", "Old users"];

export const UsersFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const minPacks = useAppSelector((state) => state.users.usersData.minPublicCardPacksCount);
    const maxPacks = useAppSelector((state) => state.users.usersData.maxPublicCardPacksCount);

    const addSortToURL = (option: keyof TSortOptions) => {
        setSearchParams({...URLParams, sortUsers: transformToURLOption(option)});
    };

    const getSortUsers = searchParams.get("sortUsers") as keyof TURLSortOptions
    const currentOption = transformURLOption(getSortUsers);

    return (
        <Filter
            options={options}
            currentOption={currentOption}
            initialParams={initialObjectParams}
            minmax={[minPacks, maxPacks - 1]}
            rangeText={"Number of packs"}
            addSortToURL={addSortToURL}
            defaultURL={initialStringParams}
        />
    );
};
