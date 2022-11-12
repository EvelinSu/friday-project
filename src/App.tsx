import React from 'react';
import {HashRouter} from "react-router-dom";
import {SSiteWrapper} from "./ui/layout/styled";
import Header from "./ui/layout/Header/Header";
import Pages from "./ui/pages/Pages";
import {ThemeProvider} from "styled-components";
import {baseTheme} from "./ui/styles/constants";
import Notification from "./ui/components/Notification/Notification";
import HeaderLinks from "./temp/HeaderLinks";
import {useAppSelector} from "./hooks/hooks";
import GlobalLoader from "./ui/components/Loaders/GlobalLoader";

function App() {
    const {isInitialized} = useAppSelector(state => state.app)

    return (
        <ThemeProvider theme={baseTheme}>
            <HashRouter>
                {!isInitialized && <GlobalLoader/>}
                <SSiteWrapper>
                    <Header />
                    <Pages />
                    <Notification />
                    <HeaderLinks />
                </SSiteWrapper>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
