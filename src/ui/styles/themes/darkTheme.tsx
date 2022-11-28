import { baseTheme } from "./baseTheme";

export const darkTheme = {
    ...baseTheme,
    colors: {
        ...baseTheme.colors,
        primaryLightest: "#353852",
        primaryLight: "#8facd3",
        primary: "#282c49",
        primaryDark: "#333760",
        secondaryLight: "#222238",
        secondary: "#171928",
        textOnSecondary: "#d0d0d0",
        textOnPrimary: "#d0d0d0",
        cards: {
            default: ["#323c5d", "rgba(85,115,180,0.62)"],
            text: "#d0d0d0",
            skeleton: "rgba(115,152,206,0.02)",
            shadow: "rgba(44,54,91,0.8)",
        },
        titles: {
            UiBox: "#7275ad",
        },
        loader: {
            alphaBg: "rgba(0, 0, 0, 0.1)",
        },
        input: {
            default: "rgba(255, 255, 255, 0.1)",
        },
        button: {
            success: "#444c81",
            successShadow: "rgba(78,63,208,0.35)",
            error: "#e16f6f",
            errorShadow: "rgba(255,54,54,0.35)",
            neutral: "#3b4164",
        },
    },
};
