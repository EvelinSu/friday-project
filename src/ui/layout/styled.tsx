import styled, {css} from "styled-components";

export const SSiteWrapper = styled.div`
    background-color: ${({theme}) => theme.colors.secondary};
    min-height: 100vh;
    padding: 15px;
    ${({theme}) => css`
        @media all and (max-width: ${theme.media.small + 'px'}) {
            padding: 0;
        }
    `}
`