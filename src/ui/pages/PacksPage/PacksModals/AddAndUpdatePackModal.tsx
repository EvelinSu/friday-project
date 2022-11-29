import React, { FC, useState } from "react";
import Input from "../../../components/Form/Input";
import Checkbox from "../../../components/Checkbox/Checkbox";
import { Box } from "../../../components/Box/Box";
import Button from "../../../components/Button/Button";
import { useAppSelector } from "../../../../hooks/hooks";
import { SForm, WithFormTitle } from "../../../components/Form/styled";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TPack } from "../../../../dal/ResponseTypes";
import { SMegaShadow } from "../../../components/MegaShadow/styled";
import { UiBox } from "../../../components/UiBox/UiBox";
import { FileUploadArea } from "../../../components/FileUploadArea/FileUploadArea";

export type TAddAndUpdatePackModalValues = {
    name: string;
    deckCover: string;
    isPrivate: boolean;
    currentPack?: TPack;
};

type TAddPackModalProps = {
    title: string;
    onClose: () => void;
    onSubmitHandler: (values: TAddAndUpdatePackModalValues) => void;
    currentPack?: TPack;
};
const AddAndUpdatePackModal: FC<TAddPackModalProps> = (props) => {
    const { isButtonsDisabled } = useAppSelector((state) => state.packs);

    const [packImage, setPackImage] = useState(props.currentPack?.deckCover || "");

    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            name: props.currentPack?.name || "",
            deckCover: packImage,
            isPrivate: props.currentPack?.private || false,
        },
        validationSchema: Yup.object({
            name: Yup.string(),
        }),
        onSubmit: (values: TAddAndUpdatePackModalValues) => {
            props.onSubmitHandler(values);
        },
    });

    const onChangePackImage = (file: string) => {
        setPackImage(file);
        values.deckCover = file;
    };

    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        props.onClose();
    };
    return (
        <SMegaShadow onClick={onClickHandler}>
            <UiBox title={props.title}>
                <SForm onSubmit={handleSubmit}>
                    <Box flexDirection={"column"}>
                        <WithFormTitle title={"Pack name"}>
                            <Input
                                value={values.name}
                                placeholder={"no name"}
                                onChange={handleChange}
                                name={"name"}
                                type={"name"}
                                autoFocus={true}
                            />
                        </WithFormTitle>
                        <WithFormTitle title={"Pack image"}>
                            <FileUploadArea
                                fileType={"image"}
                                onChange={onChangePackImage}
                                value={values.deckCover}
                            />
                        </WithFormTitle>
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
            </UiBox>
        </SMegaShadow>
    );
};

export default AddAndUpdatePackModal;
