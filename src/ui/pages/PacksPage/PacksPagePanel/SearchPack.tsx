import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import Input from "../../../components/Form/Input";
import SearchIcon from "../../../assets/icons/SearchIcon";
import {SSearchInput} from "../styled";
import {useSearchParams} from "react-router-dom";
import {getUrlParams} from "../../../../common/utils/getUrlParams";
import {useDebounce} from "usehooks-ts";

export const SearchPack = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);
    const [value, setValue] = useState(URLParams.packName || null);
    const debounceValue = useDebounce(value, 700);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    useEffect(() => {
        if (debounceValue) {
            URLParams.cardsPack_id
                ? setSearchParams({...URLParams, cardQuestion: debounceValue})
                : setSearchParams({...URLParams, packName: debounceValue});
        }
        if (debounceValue === "") {
            delete URLParams.packName;
            delete URLParams.cardQuestion;
            setSearchParams(URLParams)
        }
    }, [debounceValue]);

    useEffect(() => {
        if (!URLParams.cardQuestion && !URLParams.packName) {
            setValue("")
        }
    }, [URLParams])

    return (
        <SSearchInput>
            <Input
                onChange={onChangeHandler}
                value={value || ""}
                placeholder={"Search by name"}
                leftIcon={<SearchIcon />}
            />
        </SSearchInput>
    );
};
