import React, { useLayoutEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Profile from "./Profile/Profile";
import PageNotFound from "./PageNotFound/NotFound";
import CheckEmail from "./CheckEmail/CheckEmail";
import ChangePassword from "./ChangePassword/ChangePassword";
import RecoverPassword from "./RecoverPassword/RecoverPassword";
import {useAppDispatch} from "../../hooks/hooks";
import {authMeTC} from "../../bll/appReducer";

export const PATH = {
    profile:'/profile',
    signIn: '/signIn',
    signUp: '/signUp',
    recoverPassword: '/recoverPassword',
    changePassword: '/changePassword',
    checkEmail: '/checkEmail',
}

const Pages = () => {

    const dispatch = useAppDispatch()

    useLayoutEffect(() => {
        dispatch(authMeTC())
    },[dispatch])

    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={PATH.signIn} />} />
            <Route path={PATH.profile} element={<Profile />} />
            <Route path={PATH.signIn} element={<SignIn/>} />
            <Route path={PATH.signUp} element={<SignUp/>} />
            <Route path={PATH.recoverPassword} element={<RecoverPassword/>} />
            <Route path={PATH.changePassword} element={<ChangePassword/>} />
            <Route path={PATH.checkEmail} element={<CheckEmail/>} />
            <Route path={'*'} element={<PageNotFound/>} />
        </Routes>
    );
};

export default Pages;
