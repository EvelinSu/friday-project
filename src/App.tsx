import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import { SSiteWrapper } from "./ui/layout/styled";
import Header from "./ui/layout/Header/Header";
import Pages from "./ui/pages/Pages";
import { ThemeProvider } from "styled-components";
import { baseTheme } from "./ui/styles/constants";
import Notification from "./ui/components/Notification/Notification";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import GlobalLoader from "./ui/components/Loaders/GlobalLoader";
import { authMeTC } from "./bll/authReducer";

function App() {
    const dispatch = useAppDispatch();

    const { isInitialized } = useAppSelector((state) => state.app);

    useEffect(() => {
        dispatch(authMeTC());
    }, [dispatch]);

    return (
        <ThemeProvider theme={baseTheme}>
            <HashRouter>
                {!isInitialized && <GlobalLoader />}
                <SSiteWrapper>
                    <Header />
                    <Pages />
                    <Notification />
                </SSiteWrapper>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
