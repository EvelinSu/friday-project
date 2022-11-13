import React, {useEffect} from 'react';
import {SPageWrapper} from "../styled";
import Modal from "../../components/Modal/Modal";
import {SForm} from "../../components/Form/styled";
import {Box} from "../../components/Box/Box";
import {SText} from "../../components/Text/SText";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {useParams} from "react-router-dom";
import {setTokenAC} from "../../../bll/forgotPassReducer";

const RecoverPassword = () => {
    return (
        <SPageWrapper>
            <Modal
                title={"Create new password"}
                body={<RecoverPasswordForm />}
                width={"390px"}
            />
        </SPageWrapper>
    );
};

const RecoverPasswordForm = () => {

    const {isFetching} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const {token} = useParams()
    useEffect(() => {
        if (token) {
            dispatch(setTokenAC({token}))
        }
    },[])

    return (
        <SForm>
            <Box padding={"0 20px"} flexDirection={"column"}>
                <SText lineHeight={"24px"} opacity={0.5} textAlign={"center"}>
                    Create new password and we will send you further instructions to email
                </SText>
                <Input
                    placeholder={"Password"}
                    type={"password"}
                    required
                />
            </Box>
            <Box margin={"10px 0 0 0"} justifyContent={"center"}>
                <Button
                    type="submit"
                    label={"Accept"}
                    isLoading={isFetching}
                    shadow
                />
            </Box>
        </SForm>
    )
}


export default RecoverPassword;
