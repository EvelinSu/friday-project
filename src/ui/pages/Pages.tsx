import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from "./Login/SignIn/SignIn";
import SignUp from "./Login/SignUp/SignUp";
import PageNotFound from "./PageNotFound/NotFound";
import CheckEmail from "./Login/CheckEmail/CheckEmail";
import ChangePassword from "./Login/ChangePassword/ChangePassword";
import RecoverPassword from "./Login/RecoverPassword/RecoverPassword";
import PacksPage from "./PacksPage/PacksPage";
import { CardsPage } from "./CardsPage/CardsPage";
import { useAppSelector } from "../../hooks/hooks";
import ProfilePage from "./ProfilePage/ProfilePage";
import { LearningPage } from "./LearningPage/LearningPage";
import { initialStringParams } from "../../common/utils/getUrlParams";
import { UsersPage } from "./UsersPage/UsersPage";

export const PATH = {
    profile: "/profile",
    packsList: "/packs",
    cardsList: "/cards",
    usersList: "/users",
    learning: "/learning",
    signIn: "/login/signIn",
    signUp: "/login/signUp",
    changePassword: "/login/changePassword",
    recoverPassword: "/login/recoverPassword",
    checkEmail: "/login/checkEmail",
};

const RequireAuth = ({ redirectPath = PATH.signIn }) => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    if (!isLoggedIn) return <Navigate to={redirectPath} replace />;
    return <Outlet />;
};
const LoginRoute = ({ redirectPath = PATH.packsList + initialStringParams }) => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    if (isLoggedIn) return <Navigate to={redirectPath} replace />;
    return <Outlet />;
};

const Pages = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Navigate to={PATH.signIn} />} />
            <Route element={<RequireAuth />}>
                <Route path={PATH.profile} element={<ProfilePage />} />
                <Route path={PATH.packsList} element={<PacksPage />} />
                <Route path={PATH.cardsList} element={<CardsPage />} />
                <Route path={PATH.usersList} element={<UsersPage />} />
                <Route path={PATH.learning} element={<LearningPage />} />
            </Route>
            <Route element={<LoginRoute />}>
                <Route path={PATH.signIn} element={<SignIn />} />
                <Route path={PATH.signUp} element={<SignUp />} />
                <Route path={PATH.changePassword} element={<ChangePassword />}>
                    <Route path=":token" element={<ChangePassword />} />
                </Route>
                <Route path={PATH.recoverPassword} element={<RecoverPassword />} />
                <Route path={PATH.checkEmail} element={<CheckEmail />} />
            </Route>
            <Route path={"*"} element={<PageNotFound />} />
        </Routes>
    );
};

export default Pages;
