import React from 'react';
import {HashRouter} from "react-router-dom";
import {SSiteWrapper} from "./ui/layout/styled";
import Header from "./ui/layout/Header/Header";
import Pages from "./ui/pages/Pages";
import {ThemeProvider} from "styled-components";
import {baseTheme} from "./ui/styles/constants";
import Notification from "./ui/components/Notification/Notification";
import HeaderLinks from "./temp/HeaderLinks";

function App() {

    return (
        <ThemeProvider theme={baseTheme}>
            <HashRouter>
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
