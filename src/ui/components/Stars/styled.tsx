import styled from "styled-components";

type TSStarsWrapper = {
    isEditable: boolean;
    gap?: string;
};
export const SStarsWrapper = styled.div<TSStarsWrapper>((props) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    gap: props.gap,
    columnGap: props.gap,
    ...(props.isEditable && {
        pointerEvents: "initial",
    }),
}));

export const SStar = styled.div(() => ({
    cursor: "pointer",
    transition: "0.2s",
    ".isFill": {
        path: {
            fill: "#fff",
            stroke: "#fff",
        },
    },
    "&:hover": {
        transform: "scale(1.1)",
    },
}));
