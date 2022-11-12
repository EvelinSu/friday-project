import React, {useEffect, useLayoutEffect} from 'react';
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Profile from "./Profile/Profile";
import PageNotFound from "./PageNotFound/NotFound";
import CheckEmail from "./CheckEmail/CheckEmail";
import ChangePassword from "./ChangePassword/ChangePassword";
import RecoverPassword from "./RecoverPassword/RecoverPassword";
import {authMeTC} from "../../bll/authReducer";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

export const PATH = {
    profile: '/profile',
    signIn: '/login/signIn',
    signUp: '/login/signUp',
    recoverPassword: '/login/recoverPassword',
    changePassword: '/login/changePassword',
    checkEmail: '/login/checkEmail',
}

const Pages = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const {isLoggedIn} = useAppSelector(state => state.auth)

    useLayoutEffect(() => {
        if (location.pathname.includes('login') && isLoggedIn) navigate(PATH.profile)
        if (!location.pathname.includes('login') && !isLoggedIn) navigate(PATH.signIn)
    }, [location, navigate])

    console.log('awpdjpo')

    useEffect(() => {
        dispatch(authMeTC())
    }, [])

    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={PATH.signIn} />} />
            <Route path={PATH.profile} element={<Profile />} />
            <Route path={PATH.signIn} element={<SignIn />} />
            <Route path={PATH.signUp} element={<SignUp />} />
            <Route path={PATH.recoverPassword} element={<RecoverPassword />} />
            <Route path={PATH.changePassword} element={<ChangePassword />} />
            <Route path={PATH.checkEmail} element={<CheckEmail />} />
            <Route path={'*'} element={<PageNotFound />} />
        </Routes>
    );
};

export default Pages;
