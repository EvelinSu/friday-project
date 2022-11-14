import React from "react";
import { SPageWrapper } from "../../styled";
import { Modal } from "../../../components/Modal/Modal";
import Input from "../../../components/Form/Input";
import { Box } from "../../../components/Box/Box";
import Checkbox from "../../../components/Checkbox/Checkbox";
import { SText } from "../../../components/Text/SText";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../Pages";
import { SForm } from "../../../components/Form/styled";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginTC } from "../../../../bll/authReducer";
import { LoginDataType } from "../../../../dal/api";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";

const SignIn = () => {
    return (
        <SPageWrapper>
            <Box justifyContent={"center"} padding={"10vh 0 0"}>
                <Modal title={"Sign In"} body={<SignInForm />} />
            </Box>
        </SPageWrapper>
    );
};

const SignInForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isFetching } = useAppSelector((state) => state.auth);

    const {
        handleBlur,
        handleSubmit,
        touched,
        handleChange,
        isValid,
        setFieldValue,
        values,
        errors,
    } = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: (values: LoginDataType) => {
            dispatch(loginTC(values)).then(() => navigate(PATH.profile));
        },
    });

    return (
        <SForm onSubmit={handleSubmit}>
            <Box flexDirection={"column"}>
                <Input
                    title={"Email"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type={"email"}
                    value={values.email}
                    name="email"
                    error={touched.email ? errors.email : ""}
                    required
                />
                <Input
                    title={"Password"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    name="password"
                    error={touched.password ? errors.password : ""}
                    required
                />
            </Box>
            <Box flexWrap={"wrap"} alignItems={"center"}>
                <Checkbox
                    label={"Remember me"}
                    type="checkbox"
                    name="rememberMe"
                    checked={values.rememberMe}
                    onChange={(event) =>
                        setFieldValue("rememberMe", event.target.checked)
                    }
                />
                <Box margin={"0 0 0 auto"}>
                    <SText
                        isLink
                        onClick={() => navigate(PATH.recoverPassword)}
                    >
                        Forgot password?
                    </SText>
                </Box>
            </Box>
            <Box flexDirection={"column"} alignItems={"center"}>
                <Button
                    type="submit"
                    label={"Sign In"}
                    isDisabled={!isValid}
                    isLoading={isFetching}
                    shadow
                />
                <Box gap={10} flexDirection={"column"} alignItems={"center"}>
                    <SText textAlign={"center"}>
                        Don't you have an account?
                    </SText>
                    <SText onClick={() => navigate(PATH.signUp)} isLink>
                        Sign Up
                    </SText>
                </Box>
            </Box>
        </SForm>
    );
};

export default SignIn;
