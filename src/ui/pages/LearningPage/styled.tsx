import styled from "styled-components";
import { SStar } from "../../components/Stars/styled";

export const LearningImage = styled.img(() => ({
    maxWidth: "100%",
}));

export const SLearningContainer = styled.div((props) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    minHeight: 200,
    gap: 20,
    rowGap: 20,
}));
export const SLearningContent = styled.div(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    width: "100%",
    backgroundColor: theme.colors.primaryAlpha01,
    overflow: "auto",
    wordBreak: "break-word",
    borderRadius: 20,
    minHeight: 200,
    maxHeight: 200,
}));

export const SLearningBoxTitle = styled.div((props) => ({
    textAlign: "center",
    fontWeight: 600,
    fontSize: 16,
}));

export const SLearningStar = styled(SStar)(({ theme, title }) => ({
    ...(title && {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        "&:after": {
            content: `'${title}'`,
            textAlign: "center",
            position: "absolute",
            pointerEvents: "none",
            fontSize: 12,
            backgroundColor: theme.colors.primaryLightest,
            top: -20,
            whiteSpace: "nowrap",
            padding: 5,
            borderRadius: "3px 5px",
            zIndex: 1,
            opacity: 0,
            transition: "0.3s",
        },
        "&:hover": {
            transform: "none",
            "&:after": {
                opacity: 1,
                top: -30,
            },
        },
    }),
    svg: {
        width: 30,
        height: 30,
        path: {
            transition: "0.5s",
            stroke: theme.colors.primaryLight,
        },
    },
    ".isFill": {
        path: {
            fill: theme.colors.button.success,
            boxShadow: "0 0 1px 10px rgba(255, 255, 255, 0.5)",
            stroke: theme.colors.button.success,
        },
    },
}));
