import styled, {css} from "styled-components";

export const SForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: inherit;
`

interface TSInputWrapperProps {
    error?: string
    title?: string
}
export const SInputWrapper = styled.div<TSInputWrapperProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    position: relative;
    ${props => props.error && css`
        &:after {
            content: '${props.error}';
            position: absolute;
            color: #fff;
            left: calc(100% + 10px);
            background-color: ${props.theme.colors.status.error};
            padding: 3px 10px;
            font-size: 12px;
            z-index: ${props.theme.orders.inputErrors};
            border-radius: 5px;
            opacity: 0;
            transition: 0.2s;
        }
        &:hover {
            &:after {
                opacity: 1
            }
        }
    `}
    ${props => props.title && css`
        &:before {
            content: '${props.title}';
            position: absolute;
            top: -30px;
            left: 8px;
            padding: 3px 10px;
            font-size: 13px;
            opacity: 0.4;
        }
    `}

`

interface TSInputProps {
    isError?: boolean,
}
export const SInput = styled.input<TSInputProps>`
    padding: 10px 15px;
    border-radius: 15px;
    background-color: ${({theme}) => theme.colors.input.default};
    outline: 1px solid transparent;
    width: 100%;
    &:hover {
        opacity: 0.8
    }
    &:focus {
        outline: ${({theme}) => `1px solid ${theme.colors.primary}`};
        opacity: 1;
    }
    ${props => props.isError && css`
     outline: ${({theme}) => `1px solid ${theme.colors.status.error}`};
        &:focus {
            outline:${({theme}) => `1px solid ${theme.colors.status.error}`};
        }
    `}
`