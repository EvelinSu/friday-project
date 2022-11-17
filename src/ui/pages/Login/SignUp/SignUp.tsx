import React, { useEffect, useState } from "react";
import { SPageWrapper } from "../../styled";
import { Modal } from "../../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PATH } from "../../Pages";
import { SForm } from "../../../components/Form/styled";
import { Box } from "../../../components/Box/Box";
import Input from "../../../components/Form/Input";
import { SText } from "../../../components/Text/SText";
import Button from "../../../components/Button/Button";
import { registerTC } from "../../../../bll/registerReducer";
import { RegisterDataType } from "../../../../dal/ResponseTypes";
import ViewInputIcon from "../ViewInputIcon";

const SignUp = () => {
    return (
        <SPageWrapper>
            <Box justifyContent={"center"} padding={"10vh 0 0"}>
                <Modal title={"Sign Up"} body={<SignUpForm />} />
            </Box>
        </SPageWrapper>
    );
};

const SignUpForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isFetching } = useAppSelector((state) => state.auth);
    const isRegistered = useAppSelector((state) => state.registration.isRegistered);

    const { handleBlur, handleSubmit, touched, handleChange, isValid, values, errors } = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().required("Required").min(8, "Must be more than 7"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Required"),
        }),
        onSubmit: (values: RegisterDataType) => {
            dispatch(registerTC(values));
        },
    });
    useEffect(() => {
        if (isRegistered) {
            navigate(PATH.signIn);
        }
    }, [isRegistered, navigate]);

    const [isPasswordVisible, setIsPasswordVisible] = useState({ confirmPw: false, pw: false });

    const onViewClickHandler = (name: "confirmPw" | "pw") => {
        setIsPasswordVisible({ ...isPasswordVisible, [name]: !isPasswordVisible[name] });
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
                    placeholder={"⁎⁎⁎⁎⁎⁎⁎⁎"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type={!isPasswordVisible.pw ? "password" : "text"}
                    value={values.password}
                    name="password"
                    error={touched.password ? errors.password : ""}
                    rightIcon={
                        <ViewInputIcon
                            onClick={() => onViewClickHandler("pw")}
                            isVisible={isPasswordVisible.pw}
                        />
                    }
                    required
                />
                <Input
                    title={"Confirm password"}
                    placeholder={"⁎⁎⁎⁎⁎⁎⁎⁎"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type={!isPasswordVisible.confirmPw ? "password" : "text"}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    error={touched.confirmPassword ? errors.confirmPassword : ""}
                    rightIcon={
                        <ViewInputIcon
                            onClick={() => onViewClickHandler("confirmPw")}
                            isVisible={isPasswordVisible.confirmPw}
                        />
                    }
                    required
                />
            </Box>
            <Box flexDirection={"column"} alignItems={"center"}>
                <Button
                    type="submit"
                    label={"Sign Up"}
                    isLoading={isFetching}
                    isDisabled={!isValid}
                    withShadow
                />
                <Box gap={10} flexDirection={"column"} alignItems={"center"}>
                    <SText textAlign={"center"}>Already have an account?</SText>
                    <SText onClick={() => navigate(PATH.signIn)} isLink>
                        Sign In
                    </SText>
                </Box>
            </Box>
        </SForm>
    );
};

export default SignUp;
