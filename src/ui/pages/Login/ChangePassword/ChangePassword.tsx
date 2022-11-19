import React, { useEffect } from "react";
import { SPageWrapper } from "../../styled";
import { SForm } from "../../../components/Form/styled";
import { Box } from "../../../components/Box/Box";
import { SText } from "../../../components/Text/SText";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Form/Input";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { sendNewPassTC, setTokenAC } from "../../../../bll/forgotPassReducer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PATH } from "../../Pages";
import { UiBox } from "../../../components/UiBox/UiBox";

const ChangePassword = () => {
    return (
        <SPageWrapper>
            <Box justifyContent={"center"} padding={"10vh 0 0"}>
                <UiBox title={"Create new password"} body={<ChangePasswordForm />} width={"390px"} />
            </Box>
        </SPageWrapper>
    );
};

export const ChangePasswordForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token } = useParams();

    const isFetching = useAppSelector((state) => state.app.isFetching);
    const isTokenFromState = useAppSelector((state) => state.forgotPass.token);

    const { handleBlur, touched, handleChange, handleSubmit, isValid, values, errors } = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().required("Required"),
        }),
        onSubmit: (values: { password: string }) => {
            token && dispatch(sendNewPassTC(values.password, token));
        },
    });

    useEffect(() => {
        if (!token || !isTokenFromState) {
            navigate(PATH.profile);
        } else if (token) {
            token && dispatch(setTokenAC({ token }));
        }
    }, [isTokenFromState]);

    return (
        <SForm onSubmit={handleSubmit}>
            <Box padding={"0 20px"} flexDirection={"column"}>
                <SText lineHeight={"24px"} opacity={0.5} textAlign={"center"}>
                    Create new password and we will send you further instructions to email
                </SText>
                <Input
                    placeholder="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    name="password"
                    error={touched.password ? errors.password : ""}
                    required
                />
            </Box>
            <Box margin={"10px 0 0 0"} justifyContent={"center"}>
                <Button
                    type="submit"
                    label={"Accept"}
                    isDisabled={!isValid}
                    isLoading={isFetching}
                    withShadow
                />
            </Box>
        </SForm>
    );
};

export default ChangePassword;
