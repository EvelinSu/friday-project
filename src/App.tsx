import React, {useLayoutEffect, useState} from "react";
import {SSiteWrapper} from "./ui/layout/styled";
import Header from "./ui/layout/Header/Header";
import Pages from "./ui/pages/Pages";
import {ThemeProvider} from "styled-components";
import {baseTheme} from "./ui/styles/themes/baseTheme";
import Notification from "./ui/components/Notification/Notification";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {UserProfileModal} from "./ui/pages/UsersPage/UserModals/UserProfileModal";
import {darkTheme} from "./ui/styles/themes/darkTheme";
import GlobalLoader from "./ui/components/Loaders/GlobalLoader";
import {authMeTC} from "./bll/authReducer";
import {setCurrentTheme, TThemes} from "./bll/appReducer";
import {ParticlesContainer} from "./ui/components/Particle/Particle";
import {Box} from "./ui/components/Box/Box";

const themes = {
    light: baseTheme,
    dark: darkTheme,
};
const appTheme = localStorage.getItem("app-theme") as TThemes;

function App() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const isUserProfileOpen = useAppSelector((state) => state.users.isUserProfileOpen);
    const currentTheme = useAppSelector((state) => state.app.currentTheme);

    useLayoutEffect(() => {
        setIsLoading(true);
        dispatch(authMeTC()).then(() => setIsLoading(false));
        if (appTheme) dispatch(setCurrentTheme(appTheme));
    }, []);

    return (
        <ThemeProvider theme={themes[currentTheme]}>
            {isLoading && <GlobalLoader />}
            {currentTheme === "dark" && <Box opacity={0.3}><ParticlesContainer /></Box>}
            <SSiteWrapper>
                <Header />
                {!isLoading && <Pages />}
                <Notification />
                {isUserProfileOpen && <UserProfileModal />}
            </SSiteWrapper>
        </ThemeProvider>
    );
}

export default App;
