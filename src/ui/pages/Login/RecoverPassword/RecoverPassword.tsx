import React, { useEffect } from "react";
import { SPageWrapper } from "../../styled";
import { Modal } from "../../../components/Modal/Modal";
import { SForm } from "../../../components/Form/styled";
import { Box } from "../../../components/Box/Box";
import Input from "../../../components/Form/Input";
import { SText } from "../../../components/Text/SText";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../Pages";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { sendEmailTC } from "../../../../bll/forgotPassReducer";
import { useFormik } from "formik";
import * as Yup from "yup";

const RecoverPassword = () => {
    return (
        <SPageWrapper>
            <Box justifyContent={"center"} padding={"10vh 0 0"}>
                <Modal title={"Forgot your password?"} body={<RecoverPasswordForm />} width={"390px"} />
            </Box>
        </SPageWrapper>
    );
};

const RecoverPasswordForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSendLetter = useAppSelector((state) => state.forgotPass.isSendLetter);
    const { isFetching } = useAppSelector((state) => state.auth);

    const { handleBlur, handleSubmit, touched, handleChange, isValid, values, errors } = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
        }),
        onSubmit: ({ email }) => {
            dispatch(sendEmailTC(email));
        },
    });

    useEffect(() => {
        if (isSendLetter) {
            navigate(PATH.checkEmail);
        }
    }, [isSendLetter]);

    return (
        <SForm onSubmit={handleSubmit}>
            <Box padding={"0 20px"} flexDirection={"column"}>
                <SText lineHeight={"24px"} opacity={0.5} textAlign={"center"}>
                    Enter your email address and we will send you further instructions
                </SText>
                <Input
                    placeholder={"Email"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type={"email"}
                    value={values.email}
                    name="email"
                    error={touched.email ? errors.email : ""}
                    required
                />
            </Box>
            <Box margin={"10px 0 0 0"} alignItems={"center"} flexDirection={"column"}>
                <Button
                    type="submit"
                    label={"Send"}
                    isDisabled={!isValid}
                    isLoading={isFetching}
                    withShadow
                />
                <Box gap={10} flexDirection={"column"} alignItems={"center"}>
                    <SText textAlign={"center"}>Did you remember your password?</SText>
                    <SText onClick={() => navigate(PATH.signIn)} isLink>
                        Sign In
                    </SText>
                </Box>
            </Box>
        </SForm>
    );
};

export default RecoverPassword;
