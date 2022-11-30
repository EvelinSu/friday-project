import React, { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import Input from "../Form/Input";
import SearchIcon from "../../assets/icons/SearchIcon";
import { SSearchInput } from "../../pages/PacksPage/styled";
import { useSearchParams } from "react-router-dom";
import { getUrlParams } from "../../../common/utils/getUrlParams";
import { useDebounce } from "usehooks-ts";

type TSearchProps = {
    placeholder?: string;
    addParamToUrl: "userName" | "packName" | "cardQuestion";
};
export const Search: FC<TSearchProps> = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);
    const currentValue = URLParams.packName || URLParams.cardQuestion;
    const [value, setValue] = useState(currentValue || null);
    const debounceValue = useDebounce(value, 700);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    useEffect(() => {
        if (debounceValue) {
            setSearchParams({ ...URLParams, [props.addParamToUrl]: debounceValue });
        }
        if (debounceValue === "" && URLParams[props.addParamToUrl]) {
            delete URLParams[props.addParamToUrl];
            setSearchParams(URLParams);
        }
    }, [debounceValue]);

    useEffect(() => {
        if (!URLParams[props.addParamToUrl]) {
            setValue("");
        }
    }, [URLParams]);

    return (
        <SSearchInput>
            <Input
                onChange={onChangeHandler}
                value={value || ""}
                placeholder={props.placeholder || "Search by name"}
                leftIcon={<SearchIcon />}
            />
        </SSearchInput>
    );
};
