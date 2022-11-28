import styled, { css } from "styled-components";

export const STabs = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

type TSTabProps = {
    isActive: boolean;
    isDisabled: boolean;
};
export const STab = styled.div<TSTabProps>`
    padding: 5px 10px;
    background-color: ${({ theme }) => theme.colors.input.default};
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid transparent;

    &:hover {
        border: 1px solid ${({ theme }) => theme.colors.button.success};
    }

    ${(props) =>
        props.isActive &&
        css`
            background-color: ${props.theme.colors.button.success};
            color: ${props.theme.colors.textOnPrimary};
            pointer-events: none;
        `}
    ${(props) =>
        props.isDisabled &&
        css`
            opacity: 0.7;
            pointer-events: none;
        `}
`;
