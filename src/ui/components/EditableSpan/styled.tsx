import styled, {css} from "styled-components";

type TSEditableSpanProps = {
    disabled?: boolean
}
export const SEditableSpanInputWrapper = styled.div<TSEditableSpanProps>`
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    transition: 0.1s;
    svg {
        position: absolute;
        cursor: pointer;
        right: 0;
        padding: 5px;
        min-width: 32px;
        width: 32px;
        height: 32px;
        &:hover {
            opacity: 0.8;
        }
    }
    ${props => props.disabled && css`
        pointer-events: none;
        color: ${props.theme.colors.primary};
    `}
`

export const SEditableSpanInput = styled.input`
    background-color: ${props => props.theme.colors.input.default};
    height: 30px;
    padding: 0 40px 0 10px;
    border-radius: 15px;
    width: 100%;
    &:focus {
        opacity: 1;
        border: 1px solid ${props => props.theme.colors.primary};
    }
`

export const SEditableSpanText = styled.span<TSEditableSpanProps>`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 30px;
    border-radius: 15px;
    width: 100%;
    cursor: pointer;
    transition: 0.1s;
    span {
        transition: 0.2s;
    }
    svg {
        cursor: pointer;
        margin-left: auto;
        min-width: 14px;
        &:hover {
            opacity: 0.8;
        }
    }
    ${props => props.disabled && css`
        pointer-events: none;
        color: ${props.theme.colors.primary};
    `}
    &:hover {
        background-color: ${props => props.theme.colors.input.default};
        padding: 0 10px;
        width: 100%;
        span {
            transition: 0.2s;
            font-size: 14px !important;
        }
    }
`
