import styled from "styled-components";

export const SCardWrapper = styled.div<{ isFetching: boolean }>(({theme, isFetching}) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 7,
    rowGap: 7,
    background: `linear-gradient(112deg, ${theme.colors.cards.default[0]} 0%, ${theme.colors.cards.default[1]} 100%)`,
    padding: 15,
    minHeight: 145,
    borderRadius: 15,
    position: "relative",
    color: "#fff",
    overflow: "hidden",
    textAlign: "center",
    cursor: "pointer",
    ...(isFetching && {
        opacity: 0.6,
        pointerEvents: "none",
    }),
}));

export const SCardShadow = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: "absolute",
    opacity: 0,
    borderRadius: "inherit",
    backdropFilter: "blur(5px)",
    "-webkit-backdrop-filter": "blur(5px)",
    zIndex: 1,
    transition: "0.2s",
    "&:hover": {
        opacity: 1,
    },
});

export const SCardIcons = styled.div({
    display: "flex",
    gap: 10,
    columnGap: 10,
    position: "absolute",
    bottom: 10,
    right: 10,
});

export const SCardText = styled.div<{ lineClamp?: number }>`
    display: -webkit-box;
    -webkit-line-clamp: ${(props) => props.lineClamp || 3};
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
`;

export const SCardImage = styled.img({
    objectFit: "cover",
    objectPosition: "center",
    maxWidth: "100%",
    maxHeight: "calc(100% - 60px)",
    borderRadius: "inherit",
});
