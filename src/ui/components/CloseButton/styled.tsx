import styled from "styled-components";

export const SCloseButton = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px;
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
