import React, {FC, useState} from "react";
import CloseButton from "../../../components/CloseButton/CloseButton";
import Input from "../../../components/Form/Input";
import {Box} from "../../../components/Box/Box";
import Button from "../../../components/Button/Button";
import {useAppSelector} from "../../../../hooks/hooks";
import {SForm} from "../../../components/Form/styled";
import {useFormik} from "formik";
import * as Yup from "yup";
import {TCard} from "../../../../dal/ResponseTypes";
import {SMegaShadow} from "../../../components/MegaShadow/styled";
import {UiBox} from "../../../components/UiBox/UiBox";

export type TAddAndUpdateCardModalValues = {
    question: string;
    answer: string;
    answerImg?: string;
    questionImg?: string;
};

type TAddPackFormProps = {
    onClose: () => void;
    onSubmitHandler: (values: TAddAndUpdateCardModalValues) => void;
    currentCard?: TCard;
};

type TAddCardModalProps = {
    title: string;
    onClose: () => void;
    onSubmitHandler: (values: TAddAndUpdateCardModalValues) => void;
    currentCard?: TCard;
};
const AddAndUpdateCardModal: FC<TAddCardModalProps> = (props) => {
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        props.onClose();
    };
    return (
        <SMegaShadow onClick={onClickHandler}>
            <UiBox
                title={props.title}
                body={
                    <AddCardForm
                        onSubmitHandler={props.onSubmitHandler}
                        onClose={props.onClose}
                        currentCard={props.currentCard}
                    />
                }
            />
        </SMegaShadow>
    );
};

const AddCardForm: FC<TAddPackFormProps> = (props) => {
    const {isButtonsDisabled} = useAppSelector((state) => state.packs);

    const questionTypes = ["Text", "Image"]
    const [questionType, setQuestionType] = useState(questionTypes[0])

    const {handleSubmit, handleChange, values} = useFormik({
        initialValues: {
            question: props.currentCard?.question || "",
            answer: props.currentCard?.answer || "",
            // answerImg: props.currentCard?.answerImg || "",
            // questionImg: props.currentCard?.questionImg || "",

        },
        validationSchema: Yup.object({
            name: Yup.string(),
        }),
        onSubmit: (values: TAddAndUpdateCardModalValues) => {
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
                {/*<Select*/}
                {/*    title={"Choose a question format"}*/}
                {/*    options={questionTypes}*/}
                {/*    onChangeOption={setQuestionType}*/}
                {/*    placeholder={""}*/}
                {/*    value={questionType}*/}
                {/*    padding={"11px 12px"}*/}
                {/*/>*/}
                <Input
                    title={"Question"}
                    value={values.question}
                    onChange={handleChange}
                    name={"question"}
                    type={"text"}
                    autoFocus={true}
                />
                <Input
                    title={"Answer"}
                    value={values.answer}
                    onChange={handleChange}
                    name={"answer"}
                    type={"text"}
                />
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

export default AddAndUpdateCardModal;
