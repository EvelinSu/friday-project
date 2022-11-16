import React, { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SSiteWrapper } from "./ui/layout/styled";
import Header from "./ui/layout/Header/Header";
import Pages, { PATH } from "./ui/pages/Pages";
import { ThemeProvider } from "styled-components";
import { baseTheme } from "./ui/styles/constants";
import Notification from "./ui/components/Notification/Notification";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import GlobalLoader from "./ui/components/Loaders/GlobalLoader";
import { authMeTC } from "./bll/authReducer";

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        setIsLoading(true);
        dispatch(authMeTC()).then(() => setIsLoading(false));
    }, [dispatch]);

    const { isLoggedIn } = useAppSelector((state) => state.auth);
    useLayoutEffect(() => {
        if (location.pathname.includes("login") && isLoggedIn) navigate(PATH.profile);
        if (!location.pathname.includes("login") && !isLoggedIn) navigate(PATH.signIn);
    }, [location, isLoggedIn, navigate, isLoading]);

    return (
        <ThemeProvider theme={baseTheme}>
            {isLoading && <GlobalLoader />}
            <SSiteWrapper>
                <Header />
                {!isLoading && <Pages />}
                <Notification />
            </SSiteWrapper>
        </ThemeProvider>
    );
}

export default App;
