import styled, { css } from "styled-components";

export const STabs = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

type TSTabProps = {
    isActive: boolean;
};
export const STab = styled.div<TSTabProps>`
    padding: 5px 10px;
    background-color: ${({ theme }) => theme.colors.input.default};
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid transparent;

    &:hover {
        border: 1px solid ${({ theme }) => theme.colors.primary};
    }

    ${(props) =>
        props.isActive &&
        css`
            background-color: ${props.theme.colors.primary};
            color: ${props.theme.colors.textOnPrimary};
            pointer-events: none;
        `}
`;
