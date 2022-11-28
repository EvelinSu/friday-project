import styled from "styled-components";

type TSIconButtonProps = {
    isDark?: boolean;
    isLightest?: boolean;
    color?: string;
    size?: "sm";
    isDisabled?: boolean;
};

export const SIconButton = styled.div<TSIconButtonProps>((props) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 34,
    minWidth: 34,
    maxWidth: 34,
    borderRadius: 50,
    border: "1px solid rgba(0, 0, 0, 0.1)",
    backgroundColor: props.isDark
        ? "rgba(79, 101, 158, 0.35)"
        : props.isLightest
        ? props.theme.colors.secondaryLight
        : "rgba(255, 255, 255, 0.15)",
    cursor: "pointer",
    transition: "0.2s",
    "&:hover": {
        opacity: 0.7,
    },
    "&:active": {
        opacity: 1,
        border: `1px solid ${props.theme.colors.primary}`,
    },

    "svg path": {
        fill: props.color,
    },
    ...(props.size === "sm" && {
        height: 28,
        minWidth: 28,
        maxWidth: 28,
        svg: {
            width: 16,
            height: 16,
        },
    }),
    ...(props.isDisabled && {
        pointerEvents: "none",
        opacity: 0.5,
    }),
}));
