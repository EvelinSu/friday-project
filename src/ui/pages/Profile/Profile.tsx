import React, {useEffect} from 'react';
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

    const onclickHandler = () => {
        dispatch(logOutTC())
    }

    useEffect(() => {
        if(!auth.isLoggedIn) {
            navigate(PATH.signIn)
        }
    },[auth.isLoggedIn])

    return (
        <SPageWrapper>
            <SMainTitle>
                Profile
                <div>name : {name}</div>
                <div>email : {email}</div>
                <Button label={'Log out'} onClick={()=> onclickHandler()}/>
            </SMainTitle>
        </SPageWrapper>
    );
};

export default Profile;
