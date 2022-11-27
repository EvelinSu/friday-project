import styled, { css } from "styled-components";

type TSStarsWrapper = {
    isEditable: boolean;
    gap?: string;
};
export const SStarsWrapper = styled.div<TSStarsWrapper>`
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    gap: ${(props) => props.gap};
    column-gap: ${(props) => props.gap};
    ${(props) =>
        props.isEditable &&
        css`
            pointer-events: initial;
        `}
`;
export const SStar = styled.div`
    cursor: pointer;
    transition: 0.2s;

    .isFill {
        path {
            fill: #fff;
            stroke: #fff;
        }
    }

    &:hover {
        transform: scale(1.1);
    }

    &:active {
    }
`;
