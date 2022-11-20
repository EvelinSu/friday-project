import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Input from "../../../components/Form/Input";
import SearchIcon from "../../../assets/icons/SearchIcon";
import { SSearchInput } from "../styled";
import { useSearchParams } from "react-router-dom";
import { getUrlPacksParams } from "../../../../common/utils/getActualParams";
import { useDebounce } from "usehooks-ts";

export const SearchPack = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlPacksParams(searchParams), [searchParams]);
    const [value, setValue] = useState(URLParams.packName || "");
    const debounceValue = useDebounce(value, 500);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    useEffect(() => {
        if (debounceValue) {
            setSearchParams({ ...URLParams, packName: debounceValue });
        } else {
            delete URLParams.packName;
            setSearchParams({ ...URLParams });
        }
    }, [debounceValue]);

    return (
        <SSearchInput>
            <Input
                title={"Search"}
                onChange={onChangeHandler}
                value={value}
                placeholder={"Search by name"}
                leftIcon={<SearchIcon />}
            />
        </SSearchInput>
    );
};
