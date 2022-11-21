import React, {FC, useEffect, useMemo, useState} from "react";
import {SText} from "../../../components/Text/SText";
import {Box} from "../../../components/Box/Box";
import {DoubleRangeValueWrapper} from "../../../components/DoubleRange/styled";
import DoubleRange from "../../../components/DoubleRange/DoubleRange";
import {useDebounce} from "usehooks-ts";
import {useSearchParams} from "react-router-dom";
import {getUrlPacksParams} from "../../../../common/utils/getActualParams";
import {useAppSelector} from "../../../../hooks/hooks";

type TNumberOfCardsProps = {
    id?: string;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;

};
const NumberOfCards: FC<TNumberOfCardsProps> = ({...props}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlPacksParams(searchParams), [searchParams]);
    const [isInactive, setIsInactive] = useState(true)

    const minCardsCount = useAppSelector((state) => state.packs.cardPacksData.minCardsCount);
    const maxCardsCount = useAppSelector((state) => state.packs.cardPacksData.maxCardsCount);

    const [value1, setValue1] = useState(Number(URLParams.min) || minCardsCount)
    const [value2, setValue2] = useState(Number(URLParams.max) || maxCardsCount)
    const debounceValues = useDebounce([value1, value2], 500);

    useEffect(() => {
        setValue1(Number(URLParams.min) || minCardsCount)
        setValue2(Number(URLParams.max) > 10 ? Number(URLParams.max) : maxCardsCount > 10 ? maxCardsCount : 10)
    }, [maxCardsCount, minCardsCount])

    const onBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
        props.onBlur && props.onBlur(e);
    };

    const onChangeHandler = (valueName: "min" | "max", value: number) => {
        if (valueName === "min") setValue1(value)
        if (valueName === "max") setValue2(value)
        setIsInactive(false)
    }

    useEffect(() => {
        if (!isInactive && (value1 !== Number(URLParams.min) || value2 !== Number(URLParams.max))) {
            setSearchParams({
                ...URLParams,
                min: `${value1}`,
                max: `${value2}`
            });
        }
        setIsInactive(true);
    }, [debounceValues]);

    return (
        <Box flexDirection={"column"} gap={10}>
            <SText fontSize={"12px"} margin={"0 0 0 10px"} opacity={0.5}>
                Number of cards
            </SText>
            <Box gap={10} alignItems={"center"}>
                <DoubleRangeValueWrapper onBlur={onBlurHandler}>{value1}</DoubleRangeValueWrapper>
                <DoubleRange
                    id={props.id}
                    setValue1={(min: number) => onChangeHandler("min", min)}
                    setValue2={(max: number) => onChangeHandler("max", max)}
                    values={[value1, value2]}
                    minmax={[minCardsCount, maxCardsCount < 10 ? 10 : maxCardsCount]}
                />
                <DoubleRangeValueWrapper onBlur={onBlurHandler}>{value2}</DoubleRangeValueWrapper>
            </Box>
        </Box>
    );
};

export default NumberOfCards;
