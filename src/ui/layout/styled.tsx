import styled, { css } from "styled-components";

export const SSiteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.secondary};
    min-height: 100vh;
    max-height: 100vh;
    padding: 15px;
    color: ${({ theme }) => theme.colors.textOnSecondary};
    transition-property: background-color;
    transition: 0.2s;
    ${({ theme }) => css`
        @media all and (max-width: ${theme.media.small + "px"}) {
            padding: 0 0 20px 0;
            max-height: initial;
        }
    `};
`;
