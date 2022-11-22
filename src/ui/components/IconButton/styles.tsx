import styled, {css} from "styled-components";

type TSIconButtonProps = {
    isDark?: boolean;
    isLightest?: boolean;
    color?: string;
    size?: "sm";
    isDisabled?: boolean;
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
                    : props.isLightest
                            ? "rgba(255,255,255,0.8)"
                            : "rgba(255, 255, 255, 0.15)"};
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 1;
        border: ${({theme}) => "1px solid " + theme.colors.primary};
    }

    svg path {
        fill: ${(props) => props.color};
    }

    ${(props) =>
            props.size === "sm" &&
            css`
                height: 28px;
                min-width: 28px;
                max-width: 28px;

                svg {
                    width: 16px;
                    height: 16px;
                }
            `}

    ${(props) =>
            props.isDisabled &&
            css`
                pointer-events: none;
                opacity: 0.5;
            `}
`;
