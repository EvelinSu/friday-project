import styled from "styled-components";

const rangeStyles: any = {
    track: {
        appearance: "none",
        height: 5,
    },
    thumb: {
        "-webkit-appearance": "none !important",
        height: 16,
        width: 16,
        cursor: "pointer",
        borderRadius: 30,
        marginTop: -6,
        pointerEvents: "auto",
        zIndex: 1,
        transition: "0.2s",
        "&:hover": {
            transform: "scale(1.2)",
        },
    },
};

export const SDoubleRangeWrapper = styled.div`
    position: relative;
    user-select: none;
    display: flex;
    align-items: center;
    width: 100%;
    height: ${rangeStyles.thumb.height};
`;

type TSRangeProps = {
    value1: number;
    value2: number;
};
export const SRangeTrack = styled.div<TSRangeProps>(({ theme, value1, value2 }) => ({
    borderRadius: 10,
    position: "absolute",
    height: rangeStyles.track.height,
    left: 0,
    right: 0,
    background: `linear-gradient(to right, rgba(0, 0, 0, 0.1) ${value1}%, 
                                           ${theme.colors.button.success} ${value1}% ${value2}%, 
                                           rgba(0, 0, 0, 0.1) ${value2}%)`,
}));

export const SDoubleRange = styled.input(({ theme }) => ({
    '&[type="range"]': {
        "-webkit-appearance": "none !important",
        "-moz-appearance": "none",
        padding: 0,
        margin: 0,
        appearance: "none",
        maxWidth: "100%",
        width: "100%",
        outline: "none",
        position: "absolute",
        backgroundColor: "transparent",
        pointerEvents: "none",
        transition: "0.2s",
    },
    '&[type="range"]::-webkit-slider-runnable-track': {
        ...rangeStyles.track,
    },
    '&[type="range"]::-moz-range-track': {
        ...rangeStyles.track,
    },
    '&[type="range"]::-ms-track': {
        ...rangeStyles.track,
    },
    '&[type="range"]::-webkit-slider-thumb': {
        backgroundColor: theme.colors.button.success,
        ...rangeStyles.thumb,
    },
    '&[type="range"]::-moz-range-thumb': {
        backgroundColor: theme.colors.button.success,
        ...rangeStyles.thumb,
    },
    '&[type="range"]::-ms-thumb': {
        backgroundColor: theme.colors.button.success,
        ...rangeStyles.thumb,
    },
}));

export const DoubleRangeValueWrapper = styled.div`
    width: 20px;
    min-width: 20px;

    &:last-of-type {
        display: flex;
        justify-content: flex-end;
    }
`;
