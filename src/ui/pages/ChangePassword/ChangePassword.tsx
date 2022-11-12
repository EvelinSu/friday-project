import React from 'react';
import {SPageWrapper} from "../styled";
import Modal from "../../components/Modal/Modal";
import {SForm} from "../../components/Form/styled";
import {Box} from "../../components/Box/Box";
import {SText} from "../../components/Text/SText";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input";
import {PATH} from "../Pages";
import {useNavigate} from "react-router-dom";

const ChangePassword = () => {
    return (
        <SPageWrapper>
            <Modal
                title={"Forgot your password?"}
                body={<ChangePasswordForm />}
                width={"390px"}
            />
        </SPageWrapper>
    );
};



const ChangePasswordForm = () => {

    const navigate = useNavigate()

    return (
        <SForm>
            <Box padding={"0 20px"} flexDirection={"column"}>
                <SText opacity={0.5} textAlign={"center"}>
                    Enter your email address and we will send you further instructions
                </SText>
                <Input
                    placeholder={"Email"}
                    type={"email"}
                    required
                />
            </Box>
            <Box margin={"10px 0 0 0"} alignItems={"center"} flexDirection={"column"}>
                <Button
                    type="submit"
                    label={"Send"}
                    shadow
                />
                <Box gap={10} flexDirection={"column"} alignItems={"center"}>
                    <SText>
                        Did you remember your password?
                    </SText>
                    <SText onClick={() => navigate(PATH.signIn)} isLink>
                        Sign In
                    </SText>
                </Box>
            </Box>
        </SForm>
    )
}

export default ChangePassword;
