import styled from "styled-components";

export const SPageNotFound = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
`

export const SPageNotFoundTitle = styled.h1`
    font-size: 100px;
    color: ${({theme}) => theme.colors.primaryLightest};
    margin: 0;
    text-align: center;
`

export const SPageNotFoundImage = styled.img`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 500px;
    height: 500px;
`