import React, { useLayoutEffect, useState } from "react";
import { SSiteWrapper } from "./ui/layout/styled";
import Header from "./ui/layout/Header/Header";
import Pages from "./ui/pages/Pages";
import { ThemeProvider } from "styled-components";
import { baseTheme } from "./ui/styles/constants";
import Notification from "./ui/components/Notification/Notification";
import { useAppDispatch } from "./hooks/hooks";
import GlobalLoader from "./ui/components/Loaders/GlobalLoader";
import { authMeTC } from "./bll/authReducer";

function App() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        setIsLoading(true);
        dispatch(authMeTC()).then(() => setIsLoading(false));
    }, [dispatch]);

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
