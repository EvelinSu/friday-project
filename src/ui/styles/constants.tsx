export const baseTheme = {
    colors: {
        primaryLighter: "#8facd3",
        primary: "#7398CE",
        primaryDark: "#4F659E",
        textOnPrimary: "#eaeaea",

        secondary: "#ECECEC",
        secondaryLight: "#FFFFFF",
        textOnSecondary: "#000",

        severity: {
            error: "#ce5252",
            success: "#74b460",
        },
        input: {
            default: "rgba(76,85,154,0.09)",
        },
        button: {
            success: "#7398CE",
            successShadow: "rgba(54, 110, 255, 0.35)",
            error: "#e16f6f",
            errorShadow: "rgba(255,54,54,0.35)",
            neutral: "#a9b2cc",
        },
        cards: {
            default: ["#7398CE", "rgba(115,152,206,0.62)"],
            text: "#fff",
        },
    },
    sizes: {
        headerHeight: 68,
    },
    media: {
        extraLarge: 1140,
        large: 960,
        medium: 720,
        small: 540,
    },
    //z-index
    orders: {
        inputErrors: 2,
        modal: 10,
        notifications: 15,
        dropdown: 5,
    },
};
