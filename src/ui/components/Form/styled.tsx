import styled, { css } from "styled-components";

export const SForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: inherit;
`;

interface TSInputWrapperProps {
    error?: string;
    title?: string;
}
export const SInputWrapper = styled.div<TSInputWrapperProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    position: relative;
    ${(props) =>
        props.error &&
        css`
            &:after {
                content: "${props.error}";
                position: absolute;
                color: #fff;
                left: calc(100% + 10px);
                background-color: ${props.theme.colors.severity.error};
                padding: 3px 10px;
                font-size: 12px;
                max-width: 160px;
                width: max-content;
                z-index: ${props.theme.orders.inputErrors};
                border-radius: 5px;
                opacity: 0;
                visibility: hidden;
                transition: 0.2s;
                @media all and (max-width: 800px) {
                    left: initial;
                    right: 10px;
                    margin: 0 auto;
                    bottom: 8px;
                }
            }
            &:hover {
                &:after {
                    opacity: 1;
                    visibility: visible;
                }
            }
        `}
    ${(props) =>
        props.title &&
        css`
            margin-top: 25px;
            &:before {
                content: "${props.title}";
                position: absolute;
                top: -25px;
                left: 8px;
                padding: 3px 10px;
                font-size: 13px;
                opacity: 0.4;
            }
        `}
`;

interface TSInputProps {
    isError?: boolean;
    hasRightIcon?: boolean;
    hasLeftIcon?: boolean;
}
export const SInput = styled.input<TSInputProps>`
    padding: 10px 15px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.colors.input.default};
    outline: 1px solid transparent;
    width: 100%;
    &:hover {
        opacity: 0.8;
    }
    &:focus {
        outline: ${({ theme }) => `1px solid ${theme.colors.primary}`};
        opacity: 1;
    }
    ${(props) =>
        props.isError &&
        css`
            outline: ${({ theme }) =>
                `1px solid ${theme.colors.severity.error}`};
            &:focus {
                outline: ${({ theme }) =>
                    `1px solid ${theme.colors.severity.error}`};
            }
        `}
    &::placeholder {
        opacity: 0.4;
    }
    ${(props) =>
        props.hasLeftIcon &&
        css`
            padding-left: 40px;
        `}
    ${(props) =>
        props.hasRightIcon &&
        css`
            padding-right: 35px;
        `}
`;

export const SInputLeftIcon = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    padding: 5px 10px;
    left: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
`;

export const SInputRightIcon = styled(SInputLeftIcon)`
    left: initial;
    right: 0;
`;
