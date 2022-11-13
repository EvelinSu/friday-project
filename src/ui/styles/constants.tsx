export const baseTheme = {
    colors: {
        primary: "#7398CE",
        primaryDark: "#4F659E",
        textOnPrimary: "#eaeaea",

        secondary: "#ECECEC",
        secondaryLight: "#FFFFFF",
        textOnSecondary: "#000",

        severity: {
            error: "#ce5252",
        },
        input: {
            default: "rgba(76,85,154,0.09)",
        },
        button: {
            success: "#7398CE"
        }
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
        notifications: 15
    }
}