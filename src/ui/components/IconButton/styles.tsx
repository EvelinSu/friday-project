import styled from "styled-components";

export const SIconButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    min-width: 34px;
    max-width: 34px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.15);
    cursor: pointer;
    transition: 0.1s;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    &:active {
        background-color: rgba(255, 255, 255, 0.25);
    }
`