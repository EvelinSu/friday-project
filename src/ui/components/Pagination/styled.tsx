import styled, { css } from "styled-components";

type TSPaginationProps = {
    isActive?: boolean;
};

export const SPagination = styled.div<TSPaginationProps>((props) => ({
    display: "flex",
    alignItems: "center",
    gap: 15,
    padding: "30px 0 20px 0",
    columnGap: 15,
    rowGap: 15,
    marginTop: "auto",
    userSelect: "none",
    msUserSelect: "none",
}));

export const SPaginationItem = styled.div<TSPaginationProps>(
    ({ theme, isActive }) => ({
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        padding: 5,
        fontSize: 12,
        minWidth: 30,
        width: 32,
        height: 32,
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        cursor: "pointer",
        "&:hover": {
            transform: "scale(0.9)",
        },
        ...(isActive && {
            backgroundColor: theme.colors.primary,
            pointerEvents: "none",
            color: theme.colors.textOnPrimary,
        }),
    })
);

type TSPaginationArrow = {
    isDisabled?: boolean;
};
export const SPaginationArrow = styled.div<TSPaginationArrow>`
    cursor: pointer;
    ${(props) =>
        props.isDisabled &&
        css`
            pointer-events: none;
            opacity: 0.3;
        `}
`;
