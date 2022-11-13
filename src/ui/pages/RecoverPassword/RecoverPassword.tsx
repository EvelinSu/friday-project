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
import {useFormik} from "formik";
import * as Yup from "yup";

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





    const {
        handleBlur,
        touched,
        handleChange,
        isValid,
        values,
        errors,
    } = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Required'),
        }),
        onSubmit: (values: {password : string}) => {

            // dispatch(loginTC(values.password))
                // .then(() => navigate(PATH.profile))
        }
    });


    return (
        <SForm>
            <Box padding={"0 20px"} flexDirection={"column"}>
                <SText lineHeight={"24px"} opacity={0.5} textAlign={"center"}>
                    Create new password and we will send you further instructions to email
                </SText>
                <Input
                    title={"Password"}
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
                    shadow
                />
            </Box>
        </SForm>
    )
}


export default RecoverPassword;
