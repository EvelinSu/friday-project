import styled, {css} from "styled-components";

export const SHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({theme}) => theme.colors.text};
    background-color: ${({theme}) => theme.colors.primaryDark};
    padding: 0 30px;
    max-height: 68px;
    gap: 20px;
    min-height: 68px;
    margin: 10px;
    border-radius: 20px;
    overflow: auto;
`

export const SHeaderLogo = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10%;
    cursor: pointer;
    transition: 0.2s;
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