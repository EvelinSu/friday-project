import React, {useLayoutEffect, useMemo, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {SSiteWrapper} from "./ui/layout/styled";
import Header from "./ui/layout/Header/Header";
import Pages, {PATH} from "./ui/pages/Pages";
import {ThemeProvider} from "styled-components";
import {baseTheme} from "./ui/styles/constants";
import Notification from "./ui/components/Notification/Notification";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import GlobalLoader from "./ui/components/Loaders/GlobalLoader";
import {authMeTC} from "./bll/authReducer";
import {getUrlParams} from "./common/utils/getUrlParams";

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    useLayoutEffect(() => {
        setIsLoading(true);
        dispatch(authMeTC()).then(() => setIsLoading(false));
    }, [dispatch]);

    const {isLoggedIn} = useAppSelector((state) => state.auth);

    useLayoutEffect(() => {
        if (location.pathname.includes("login") && isLoggedIn) {
            return navigate(
                PATH.packsList + `?page=1&pageCount=${URLParams.pageCount}`);
        }
        if (!location.pathname.includes("login") && !isLoggedIn) return navigate(PATH.signIn);
    }, [location, isLoggedIn, isLoading]);

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
