import styled, {css} from "styled-components";

export const SHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({theme}) => theme.colors.textOnPrimary};
    background-color: ${({theme}) => theme.colors.primaryDark};
    padding: 0 30px;
    max-height: ${({theme}) => theme.sizes.headerHeight + 'px'};
    min-height: ${({theme}) => theme.sizes.headerHeight + 'px'};
    gap: 20px;
    border-radius: 20px;
    overflow: auto;
    width: 100%;
    ${({theme}) => css`
        @media all and (max-width: ${theme.media.small + 'px'}) {
            border-radius: 0;
            padding: 0 20px;
        }
    `}
`

export const SHeaderLogo = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10%;
    cursor: pointer;
    transition: 0.2s;
    ${({theme}) => css`
        @media all and (max-width: ${theme.media.small + 'px'}) {
            margin-left: 0;
            width: 130px;
        }
    `}
    &:hover {
        opacity: 0.8;
    }
    &:active {
        transform: scale(1.03);
    }
`

type TSHeaderButtonProps = {
    disabled: boolean
}
export const SHeaderButton = styled.button<TSHeaderButtonProps>`
    display: flex;
    gap: 15px;
    cursor: pointer;
    align-items: center;
    background-color: transparent;
    transition: 0.2s;
    &:hover {
        transform: translateX(3px);
    }
    ${props => props.disabled && css`
        pointer-events: none;
        opacity: 0.7;
    `}
`