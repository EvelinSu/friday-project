import styled from "styled-components";

export const SHeader = styled.div`
    display: flex;
    color: ${({theme}) => theme.colors.text};
    background-color: ${({theme}) => theme.colors.primary};
    padding: 0 20px;
    margin: 10px;
    border-radius: 20px;
    overflow: auto;
`

export const SHeaderItem = styled.div`
    padding: 20px;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
        opacity: 0.4;
    }
`