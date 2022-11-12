import React, { useLayoutEffect} from 'react';
import {SMainTitle, SPageWrapper} from "../styled";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import Button from "../../components/Button/Button";
import {logOutTC} from "../../../bll/authReducer";
import {useNavigate} from "react-router-dom";
import {PATH} from "../Pages";

const Profile = () => {

    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const {name, email} = auth.userData

    const onClickHandler = () => {
        dispatch(logOutTC())
    }

    useLayoutEffect(() => {
        if (!auth.isLoggedIn) {
            navigate(PATH.signIn)
        }
    }, [auth.isLoggedIn, navigate])

    return (
        <SPageWrapper>
            <SMainTitle>
                Profile
                <div>name : {name}</div>
                <div>email : {email}</div>
                <Button label={'Log out'} onClick={onClickHandler} />
            </SMainTitle>
        </SPageWrapper>
    );
};

export default Profile;
