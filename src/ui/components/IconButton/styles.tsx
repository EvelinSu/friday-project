import styled from "styled-components";

type TSIconButtonProps = {
    isDark?: boolean;
};
export const SIconButton = styled.div<TSIconButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    min-width: 34px;
    max-width: 34px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: ${(props) =>
        props.isDark
            ? "rgba(79, 101, 158, 0.35)"
            : "rgba(255, 255, 255, 0.15)"};
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        opacity: 0.7;
    }
    &:active {
        opacity: 1;
        border: ${({ theme }) => "1px solid " + theme.colors.primary};
    }
`;
