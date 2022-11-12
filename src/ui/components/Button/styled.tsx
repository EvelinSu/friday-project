import styled, {css, keyframes} from "styled-components";

const buttonLoad = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  50% {
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
`
interface TSButton {
    backgroundColor?: string,
    size?: 'lg' | 'sm',
    hasIcon?: boolean,
    shadow?: boolean,
}

export const SButton = styled.button<TSButton>`
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 7px 15px;
    border-radius: 20px;
    background-color: ${props => props.backgroundColor || props.theme.colors.button.success};
    color: #fff;
    cursor: pointer;
    transition: 0.1s;
    &:hover {
        box-shadow: inset 0 0 30px 30px rgba(255, 255, 255, 0.1);
    }
    &:active {
        box-shadow: inset 0 0 30px 30px rgba(255, 255, 255, 0);
    };
    ${(props) => props.shadow && css`
        box-shadow: 0 4px 18px rgba(54, 110, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        padding: 10px 30px;
        font-size: 16px;
    `};
    ${props => props.disabled && css`
        opacity: 0.4;
        pointer-events: none;
    `}
    ${props => props.size === 'lg' && css`
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 18px;
    `}
    ${props => props.hasIcon && css`
        gap: 10px;
        svg {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            width: 20px;
            height: 20px;
        }
    `}
`

export const SLoadingButton = styled(SButton)`
    pointer-events: none;
    animation: 1s ${buttonLoad} ease-out infinite;
    background-color: ${({theme}) => theme.colors.primary};
    opacity: 1;
    transition: 0.2s;
`

