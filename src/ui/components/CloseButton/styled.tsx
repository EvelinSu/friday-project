import styled from "styled-components";

export const SCloseButton = styled.div<{ padding?: string }>`
    position: absolute;
    top: 5px;
    right: 5px;
    padding: ${(props) => props.padding || "5px"};
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }

    svg {
        width: 18px;
        height: 18px;
    }

    svg path {
        fill: ${(props) => props.color};
        stroke: ${(props) => props.color};
    }
`;
