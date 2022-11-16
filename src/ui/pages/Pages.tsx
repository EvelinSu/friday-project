import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignIn from "./Login/SignIn/SignIn";
import SignUp from "./Login/SignUp/SignUp";
import Profile from "./Profile/Profile";
import PageNotFound from "./PageNotFound/NotFound";
import CheckEmail from "./Login/CheckEmail/CheckEmail";
import ChangePassword from "./Login/ChangePassword/ChangePassword";
import RecoverPassword from "./Login/RecoverPassword/RecoverPassword";
import { useAppSelector } from "../../hooks/hooks";
import PacksPage from "./PacksList/PacksPage";

export const PATH = {
    profile: "/profile",
    packsList: "/packsList",
    signIn: "/login/signIn",
    signUp: "/login/signUp",
    changePassword: "/login/changePassword",
    recoverPassword: "/login/recoverPassword",
    checkEmail: "/login/checkEmail",
};

const Pages = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (location.pathname.includes("login") && isLoggedIn) {
            navigate(PATH.profile);
        }
        // if (!location.pathname.includes("login") && !isLoggedIn) {
        //     navigate(PATH.signIn);
        // }
    }, [location, isLoggedIn]);

    return (
        <Routes>
            <Route path={"/"} element={<Navigate to={PATH.signIn} />} />
            <Route path={PATH.profile} element={<Profile />} />
            <Route path={PATH.packsList} element={<PacksPage />} />
            <Route path={PATH.signIn} element={<SignIn />} />
            <Route path={PATH.signUp} element={<SignUp />} />
            <Route path={PATH.changePassword} element={<ChangePassword />}>
                <Route path=":token" element={<ChangePassword />} />
            </Route>
            <Route path={PATH.recoverPassword} element={<RecoverPassword />} />
            <Route path={PATH.checkEmail} element={<CheckEmail />} />
            <Route path={"*"} element={<PageNotFound />} />
        </Routes>
    );
};

export default Pages;
