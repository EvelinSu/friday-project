import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Profile from "./Profile/Profile";
import RecoverPassword from "./RecoverPassword/RecoverPassword";
import ChangePassword from "./ChangePassword/ChangePassword";
import Test from "./Test/Test";
import PageNotFound from "./PageNotFound/NotFound";

export const PATH = [
    {link: '/signUp', title: 'Sign up', element: <SignUp />},
    {link: '/signIn', title: 'Sign in', element: <SignIn />},
    {link: '/profile', title: 'Profile', element: <Profile />},
    {link: '/recoverPassword', title: 'Recover password', element: <RecoverPassword />},
    {link: '/changePassword', title: 'Change password', element: <ChangePassword />},
    {link: '/test', title: 'Test', element: <Test />},
    {link: '*', title: '404', element: <PageNotFound />},
]

const Pages = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={'/profile'} />} />
            {PATH.map(({link, element}, i) => (
                <Route key={i} path={link} element={element} />
            ))}
        </Routes>
    );
};

export default Pages;
