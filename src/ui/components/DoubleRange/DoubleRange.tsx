import React from "react";
import { SDoubleRange, SDoubleRangeWrapper, SRangeTrack } from "./styled";

type SuperDoubleRangePropsType = {
    setValue1: (value: number) => void;
    setValue2: (value: number) => void;
    values: [number, number];
    minmax: Array<number>;
    step?: number;
    // min, max, step, disable, ...
};

const DoubleRange: React.FC<SuperDoubleRangePropsType> = ({
    setValue1,
    setValue2,
    values,
    step = 1,
    minmax,
    // min, max, step, disable, ...
}) => {
    let gap = minmax[1] / 5;

    const onChangeValue1 = (newValue: number) => {
        if (newValue + gap <= values[1]) setValue1(newValue);
    };
    const onChangeValue2 = (newValue: number) => {
        if (values[0] + gap <= newValue) setValue2(newValue);
    };
    const getPercent = (num: number) => {
        return ((num - minmax[0]) * 100) / (minmax[1] - minmax[0]);
    };

    return (
        <SDoubleRangeWrapper>
            <SRangeTrack value1={getPercent(values[0])} value2={getPercent(values[1])}></SRangeTrack>
            <SDoubleRange
                type={"range"}
                onChange={(e) => onChangeValue1(+e.currentTarget.value)}
                value={values[0]}
                step={step}
                min={minmax[0]}
                max={minmax[1]}
            />
            <SDoubleRange
                type={"range"}
                onChange={(e) => onChangeValue2(+e.currentTarget.value)}
                value={values[1]}
                step={step}
                min={minmax[0]}
                max={minmax[1]}
            />
        </SDoubleRangeWrapper>
    );
};

export default DoubleRange;
