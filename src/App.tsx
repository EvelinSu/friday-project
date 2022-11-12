import React, {useEffect} from 'react';
import {HashRouter} from "react-router-dom";
import {SSiteWrapper} from "./ui/layout/styled";
import Header from "./ui/layout/Header/Header";
import Pages from "./ui/pages/Pages";
import {ThemeProvider} from "styled-components";
import {baseTheme} from "./ui/styles/constants";
import HeaderLinks from "./temp/HeaderLinks";
import Notification from "./ui/components/Notification/Notification";
import {useAppDispatch} from "./hooks/hooks";
import {authMeTC} from "./bll/authReducer";

function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authMeTC())
    }, [dispatch])

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
