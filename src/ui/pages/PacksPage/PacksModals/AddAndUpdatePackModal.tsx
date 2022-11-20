import React, { FC } from "react";
import CloseButton from "../../../components/CloseButton/CloseButton";
import Input from "../../../components/Form/Input";
import Checkbox from "../../../components/Checkbox/Checkbox";
import { Box } from "../../../components/Box/Box";
import Button from "../../../components/Button/Button";
import { useAppSelector } from "../../../../hooks/hooks";
import { SForm } from "../../../components/Form/styled";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TPack } from "../../../../dal/ResponseTypes";
import { SMegaShadow } from "../../../components/MegaShadow/styled";
import { UiBox } from "../../../components/UiBox/UiBox";

type TAddPackModalProps = {
    title: string;
    onClose: () => void;
    onSubmitHandler: (values: TAddAndUpdatePackModalValues) => void;
    currentPack?: TPack;
};

export type TAddAndUpdatePackModalValues = {
    name: string;
    deckCover: string;
    isPrivate: boolean;
    currentPack?: TPack;
};

type TAddPackFormProps = {
    onClose: () => void;
    onSubmitHandler: (values: TAddAndUpdatePackModalValues) => void;
    currentPack?: TPack;
};
const AddAndUpdatePackModal: FC<TAddPackModalProps> = (props) => {
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        props.onClose();
    };
    return (
        <SMegaShadow onClick={onClickHandler}>
            <UiBox
                title={props.title}
                body={
                    <AddPackForm
                        onSubmitHandler={props.onSubmitHandler}
                        onClose={props.onClose}
                        currentPack={props.currentPack}
                    />
                }
            />
        </SMegaShadow>
    );
};

const AddPackForm: FC<TAddPackFormProps> = (props) => {
    const { isButtonsDisabled } = useAppSelector((state) => state.packs);

    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            name: props.currentPack?.name || "",
            deckCover: props.currentPack?.deckCover || "",
            isPrivate: props.currentPack?.private || false,
        },
        validationSchema: Yup.object({
            name: Yup.string(),
        }),
        onSubmit: (values: TAddAndUpdatePackModalValues) => {
            props.onSubmitHandler(values);
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
                    autoFocus={true}
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
                        isLoading={isButtonsDisabled}
                        label={"Save"}
                        severity={"success"}
                        size={"lg"}
                    />
                    <Button
                        isLoading={isButtonsDisabled}
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

export default AddAndUpdatePackModal;
