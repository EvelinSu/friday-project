import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Profile from "./Profile/Profile";
import RecoverPassword from "./RecoverPassword/RecoverPassword";
import ChangePassword from "./ChangePassword/ChangePassword";
import Test from "./Test/Test";
import PageNotFound from "./NotFound";

export const PATH = [
    {link: '/signUp', title: 'Sign up', element: <SignUp />},
    {link: '/signIn', title: 'SignIn', element: <SignIn />},
    {link: '/profile', title: 'Profile', element: <Profile />},
    {link: '/recoverPassword', title: 'RecoverPassword', element: <RecoverPassword />},
    {link: '/changePassword', title: 'ChangePassword', element: <ChangePassword />},
    {link: '/test', title: 'Test', element: <Test />},
]

const Pages = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={'/profile'} />} />
            {PATH.map(({link, element}) => (
                <Route path={link} element={element} />
            ))}
            <Route path={'*'} element={<PageNotFound />} />
        </Routes>
    );
};

export default Pages;
