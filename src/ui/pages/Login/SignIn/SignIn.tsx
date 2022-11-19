import React, { useState } from "react";
import { SPageWrapper } from "../../styled";
import { UiBox } from "../../../components/UiBox/UiBox";
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
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import ViewInputIcon from "../ViewInputIcon";
import { TLoginData } from "../../../../dal/ResponseTypes";

const SignIn = () => {
    return (
        <SPageWrapper>
            <Box justifyContent={"center"} padding={"10vh 0 0"}>
                <UiBox title={"Sign In"} body={<SignInForm />} />
            </Box>
        </SPageWrapper>
    );
};

const SignInForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector((state) => state.app.isFetching);
    const registerData = useAppSelector((state) => state.auth.registerData);

    const { handleBlur, handleSubmit, touched, handleChange, isValid, setFieldValue, values, errors } =
        useFormik({
            initialValues: {
                email: registerData.email || "",
                password: registerData.password || "",
                rememberMe: false,
            },
            validationSchema: Yup.object({
                email: Yup.string().email("Invalid email address").required("Required"),
                password: Yup.string().required("Required"),
            }),
            onSubmit: (values: TLoginData) => {
                dispatch(loginTC(values));
            },
        });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onViewClickHandler = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <SForm onSubmit={handleSubmit}>
            <Box flexDirection={"column"}>
                <Input
                    title={"Email"}
                    placeholder={"example@gmail.com"}
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
                    placeholder={"⁎⁎⁎⁎⁎⁎⁎⁎"}
                    onChange={handleChange}
                    type={!isPasswordVisible ? "password" : "text"}
                    value={values.password}
                    name="password"
                    error={touched.password ? errors.password : ""}
                    rightIcon={
                        <ViewInputIcon isVisible={isPasswordVisible} onClick={onViewClickHandler} />
                    }
                    required
                />
            </Box>
            <Box flexWrap={"wrap"} alignItems={"center"}>
                <Checkbox
                    label={"Remember me"}
                    type="checkbox"
                    name="rememberMe"
                    checked={values.rememberMe}
                    onChange={(event) => setFieldValue("rememberMe", event.target.checked)}
                />
                <Box margin={"0 0 0 auto"}>
                    <SText isLink onClick={() => navigate(PATH.recoverPassword)}>
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
                    withShadow
                />
                <Box gap={10} flexDirection={"column"} alignItems={"center"}>
                    <SText textAlign={"center"}>Don't you have an account?</SText>
                    <SText onClick={() => navigate(PATH.signUp)} isLink>
                        Sign Up
                    </SText>
                </Box>
            </Box>
        </SForm>
    );
};

export default SignIn;
