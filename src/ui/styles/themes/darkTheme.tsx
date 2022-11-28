import { baseTheme } from "./baseTheme";

export const darkTheme = {
    ...baseTheme,
    colors: {
        ...baseTheme.colors,
        primaryLightest: "#3e4975",
        primaryLight: "#8facd3",
        primary: "#2c3852",
        primaryDark: "#334060",
        secondaryLight: "#323c54",
        secondary: "#232d44",
        secondaryLightAlpha07: "rgba(50,60,84,0.7)",
        textOnSecondary: "#d0d0d0",
        textOnPrimary: "#d0d0d0",
        cards: {
            default: ["#313d5b", "rgba(69,84,122,0.37)"],
            text: "#d0d0d0",
            skeleton: "rgba(115,152,206,0.02)",
            shadow: "rgba(44,54,91,0.8)",
        },
        loader: {
            alphaBg: "rgba(0, 0, 0, 0.2)",
        },
        input: {
            default: "rgba(255, 255, 255, 0.1)",
        },
        button: {
            success: "#4F659E",
            successShadow: "rgba(79,101,158,0.55)",
            error: "#e16f6f",
            errorShadow: "rgba(255,54,54,0.35)",
            neutral: "#3b4b64",
        },
    },
};
