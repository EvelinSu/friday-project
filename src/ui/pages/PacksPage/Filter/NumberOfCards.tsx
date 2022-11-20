import React, { FC } from "react";
import { SText } from "../../../components/Text/SText";
import { Box } from "../../../components/Box/Box";
import { DoubleRangeValueWrapper } from "../../../components/DoubleRange/styled";
import DoubleRange from "../../../components/DoubleRange/DoubleRange";
import { useAppSelector } from "../../../../hooks/hooks";

type TNumberOfCardsProps = {
    setValue1: (value: number) => void;
    setValue2: (value: number) => void;
    value1: number;
    value2: number;
    id?: string;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
};
const NumberOfCards: FC<TNumberOfCardsProps> = ({ value1, value2, setValue1, setValue2, ...props }) => {
    const valueMin = useAppSelector((state) => state.packs.cardPacksData.minCardsCount);
    const valueMax = useAppSelector((state) => state.packs.cardPacksData.maxCardsCount);
    const onBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
        props.onBlur && props.onBlur(e);
    };

    return (
        <Box flexDirection={"column"} gap={10}>
            <SText fontSize={"12px"} margin={"0 0 0 10px"} opacity={0.5}>
                Number of cards
            </SText>
            <Box gap={10} alignItems={"center"}>
                <DoubleRangeValueWrapper onBlur={onBlurHandler}>{value1}</DoubleRangeValueWrapper>
                <DoubleRange
                    id={props.id}
                    setValue1={setValue1}
                    setValue2={setValue2}
                    values={[value1, value2]}
                    minmax={[valueMin, valueMax]}
                />
                <DoubleRangeValueWrapper onBlur={onBlurHandler}>{value2}</DoubleRangeValueWrapper>
            </Box>
        </Box>
    );
};

export default NumberOfCards;
