import React, { FC } from "react";
import { Modal } from "../../../components/Modal/Modal";
import { SMegaShadow } from "../../../components/Modal/styled";
import CloseButton from "../../../components/CloseButton/CloseButton";
import Input from "../../../components/Form/Input";
import Checkbox from "../../../components/Checkbox/Checkbox";
import { Box } from "../../../components/Box/Box";
import Button from "../../../components/Button/Button";
import { useSearchParams } from "react-router-dom";
import { getActualPacksParams } from "../../../../common/utils/getActualParams";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { SForm } from "../../../components/Form/styled";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addNewPack } from "../../../../bll/packsReducer";

type TAddPackModalProps = {
    onClose: () => void;
};
const AddPackModal: FC<TAddPackModalProps> = (props) => {
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        props.onClose();
    };
    return (
        <SMegaShadow onClick={onClickHandler}>
            <Modal title={"Add new pack"} body={<AddPackForm onClose={props.onClose} />} />
        </SMegaShadow>
    );
};

const AddPackForm: FC<TAddPackModalProps> = (props) => {
    const [searchParams] = useSearchParams();
    const URLParams = getActualPacksParams(searchParams);
    const dispatch = useAppDispatch();

    const isFetching = useAppSelector((state) => state.packs.isAddFetching);

    const { resetForm, handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            name: "",
            deckCover: "",
            isPrivate: false,
        },
        validationSchema: Yup.object({
            name: Yup.string(),
        }),
        onSubmit: (values) => {
            dispatch(addNewPack(values, URLParams)).then(() => {
                props.onClose();
            });
            resetForm();
        },
    });

    return (
        <SForm onSubmit={handleSubmit}>
            <Box flexDirection={"column"}>
                <CloseButton
                    onClick={() => props.onClose()}
                    color={"rgba(0, 0, 0, 0.5)"}
                    padding="10px"
                />
                <Input
                    title={"Name pack"}
                    value={values.name}
                    onChange={handleChange}
                    name={"name"}
                    type={"name"}
                />
                <Box>
                    <Checkbox
                        type={"checkbox"}
                        label={"Private pack"}
                        name="isPrivate"
                        checked={values.isPrivate}
                        onChange={handleChange}
                    />
                </Box>
                <Box justifyContent={"center"}>
                    <Button
                        type="submit"
                        isLoading={isFetching}
                        label={"Save"}
                        severity={"success"}
                        size={"lg"}
                    />
                    <Button
                        isLoading={isFetching}
                        onClick={() => props.onClose()}
                        label={"Cancel"}
                        severity={"neutral"}
                        size={"lg"}
                    />
                </Box>
            </Box>
        </SForm>
    );
};

export default AddPackModal;
