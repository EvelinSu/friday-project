import React, { FC } from "react";
import { SText } from "../../../components/Text/SText";
import { Box } from "../../../components/Box/Box";
import { DoubleRangeValueWrapper } from "../../../components/DoubleRange/styled";
import DoubleRange from "../../../components/DoubleRange/DoubleRange";

type TNumberOfCardsProps = {
    setValue1: (value: number) => void;
    setValue2: (value: number) => void;
    value1: number;
    value2: number;
};

const NumberOfCards: FC<TNumberOfCardsProps> = ({
    value1,
    value2,
    setValue1,
    setValue2,
}) => {
    return (
        <Box flexDirection={"column"} gap={10}>
            <SText margin={"0 0 0 10px"} opacity={0.5}>
                Number of cards
            </SText>
            <Box gap={10} alignItems={"center"}>
                <DoubleRangeValueWrapper>{value1}</DoubleRangeValueWrapper>
                <DoubleRange
                    setValue1={setValue1}
                    setValue2={setValue2}
                    values={[value1, value2]}
                    minmax={[0, 10]}
                />
                <DoubleRangeValueWrapper>{value2}</DoubleRangeValueWrapper>
            </Box>
        </Box>
    );
};

export default NumberOfCards;
