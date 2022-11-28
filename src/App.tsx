import React from "react";
import { SSiteWrapper } from "./ui/layout/styled";
import Header from "./ui/layout/Header/Header";
import Pages from "./ui/pages/Pages";
import { ThemeProvider } from "styled-components";
import { baseTheme } from "./ui/styles/themes/baseTheme";
import Notification from "./ui/components/Notification/Notification";
import { useAppSelector } from "./hooks/hooks";
import { UserProfileModal } from "./ui/pages/UsersPage/UserModals/UserProfileModal";
import { darkTheme } from "./ui/styles/themes/darkTheme";

const themes = {
    light: baseTheme,
    dark: darkTheme,
};

function App() {
    const isUserProfileOpen = useAppSelector((state) => state.user.isUserProfileOpen);
    const currentTheme = useAppSelector((state) => state.app.currentTheme);

    return (
        <ThemeProvider theme={themes[currentTheme]}>
            <SSiteWrapper>
                <Header />
                {<Pages />}
                <Notification />
                {isUserProfileOpen && <UserProfileModal />}
            </SSiteWrapper>
        </ThemeProvider>
    );
}

export default App;
