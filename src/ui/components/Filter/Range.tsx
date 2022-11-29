import React, { FC, useEffect, useMemo, useState } from "react";
import { Box } from "../Box/Box";
import { DoubleRangeValueWrapper } from "../DoubleRange/styled";
import DoubleRange from "../DoubleRange/DoubleRange";
import { useDebounce } from "usehooks-ts";
import { useSearchParams } from "react-router-dom";
import { getUrlParams } from "../../../common/utils/getUrlParams";
import { WithFormTitle } from "../Form/styled";

type TNumberOfCardsProps = {
    id?: string;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
    isDisabled?: boolean;
    minmax: [number, number];
    title: string;
};
const Range: FC<TNumberOfCardsProps> = ({ ...props }) => {
    const [minCardsCount, maxCardsCount] = props.minmax;

    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);
    const URLMin = URLParams.min ? Number(URLParams.min) : undefined;
    const URLMax = URLParams.max ? Number(URLParams.max) : undefined;

    const [isInactive, setIsInactive] = useState(true);

    const [value1, setValue1] = useState(URLMin || minCardsCount);
    const [value2, setValue2] = useState(URLMax || maxCardsCount);

    const debounceValues1 = useDebounce(value1, 500);
    const debounceValues2 = useDebounce(value2, 500);

    const onBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
        props.onBlur && props.onBlur(e);
    };

    const onChangeHandler = (valueName: "min" | "max", value: number) => {
        if (valueName === "min") setValue1(value);
        if (valueName === "max") setValue2(value);
        setIsInactive(false);
    };

    useEffect(() => {
        if (!isInactive && (+value1 !== URLMin || +value2 !== URLMax)) {
            setSearchParams({
                ...URLParams,
                min: `${value1}`,
                max: `${value2}`,
            });
        }

        setIsInactive(true);
        if (URLMax === maxCardsCount && URLMin === minCardsCount) {
            delete URLParams.min;
            delete URLParams.max;
            setSearchParams(URLParams);
        }
    }, [debounceValues1, debounceValues2]);

    return (
        <Box flexDirection={"column"} width={"100%"} gap={10}>
            <WithFormTitle title={props.title}>
                <Box gap={10} alignItems={"center"}>
                    <DoubleRangeValueWrapper>{value1}</DoubleRangeValueWrapper>
                    <DoubleRange
                        id={props.id}
                        setValue1={(min: number) => onChangeHandler("min", min)}
                        setValue2={(max: number) => onChangeHandler("max", max)}
                        values={[value1, value2]}
                        minmax={[minCardsCount, maxCardsCount < 5 ? 5 : maxCardsCount]}
                        onBlurHandler={onBlurHandler}
                        isDisabled={props.isDisabled}
                    />
                    <DoubleRangeValueWrapper>{value2}</DoubleRangeValueWrapper>
                </Box>
            </WithFormTitle>
        </Box>
    );
};

export default Range;
