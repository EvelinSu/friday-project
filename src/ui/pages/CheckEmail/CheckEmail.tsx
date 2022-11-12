import React from 'react';
import {SPageWrapper} from "../styled";
import Modal from "../../components/Modal/Modal";
import MainEmailIcon from "../../assets/icons/MainEmailIcon";
import { Box } from '../../components/Box/Box';
import {SText} from "../../components/Text/SText";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {PATH} from "../Pages";

const CheckEmail = () => {
    return (
        <SPageWrapper>
            <Modal
                title={"Check email"}
                body={<CheckEmailModal/>}
                width={"390px"}
            />
        </SPageWrapper>
    );
};


const CheckEmailModal = () => {
    const navigate = useNavigate()

    return (
        <Box margin={"0 0 15px 0"} flexDirection={"column"} alignItems={"center"}>
            <MainEmailIcon/>
            <SText lineHeight={"24px"} opacity={0.5} textAlign={"center"}>
                We’ve sent an Email with instructions to example@mail.com
            </SText>
            <Button onClick={() => navigate(PATH.signIn)} label={"Back to login"} shadow/>
        </Box>
    )
}

export default CheckEmail;
