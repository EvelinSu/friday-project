import React, {FC, useState} from "react";
import Input from "../../../components/Form/Input";
import {Box} from "../../../components/Box/Box";
import Button from "../../../components/Button/Button";
import {useAppSelector} from "../../../../hooks/hooks";
import {SForm, WithFormTitle} from "../../../components/Form/styled";
import {useFormik} from "formik";
import * as Yup from "yup";
import {TCard} from "../../../../dal/ResponseTypes";
import {SMegaShadow} from "../../../components/MegaShadow/styled";
import {UiBox} from "../../../components/UiBox/UiBox";
import Select from "../../../components/Select/Select";
import {FileUploadArea} from "../../../components/FileUploadArea/FileUploadArea";

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
    const [questionImage, setQuestionImage] = useState(props.currentCard?.questionImg || "")
    const [answerImage, setAnswerImage] = useState(props.currentCard?.answerImg || "")
    const [questionType, setQuestionType] = useState(
        ((questionImage && questionImage !== "null")
            || (answerImage && answerImage !== "null"))
            ? questionTypes[1] : questionTypes[0])

    const {handleSubmit, handleChange, values} = useFormik({
        initialValues: {
            question: props.currentCard?.question || "",
            answer: props.currentCard?.answer || "",
            questionImg: questionImage,
            answerImg: answerImage,
        },
        validationSchema: Yup.object({
            name: Yup.string(),
        }),
        onSubmit: (values: TAddAndUpdateCardModalValues) => {
            if (questionType === "Text") {
                values = {...values, questionImg: undefined, answerImg: undefined}
                setAnswerImage("null")
                setQuestionImage("null")
            }
            if (questionType === "Image") values = {...values, question: "", answer: ""}
            props.onSubmitHandler(values);
        },
    });

    const onChangeImage = (type: "question" | "answer", file: string) => {
        if (type === "question") {
            setQuestionImage(file)
            values.questionImg = file
        }
        if (type === "answer") {
            setAnswerImage(file)
            values.answerImg = file
        }
    }

    return (
        <SForm onSubmit={handleSubmit}>
            <Box flexDirection={"column"}>
                <WithFormTitle title={"Choose a question format"}>
                    <Select
                        options={questionTypes}
                        onChangeOption={setQuestionType}
                        placeholder={""}
                        value={questionType}
                        padding={"11px 12px"}
                    />
                </WithFormTitle>
                {questionType === "Text" && (
                    <>
                        <WithFormTitle title={"Question"}>
                            <Input
                                value={values.question}
                                onChange={handleChange}
                                name={"question"}
                                type={"text"}
                                autoFocus={true}
                            />
                        </WithFormTitle>
                        <WithFormTitle title={"Answer"}>
                            <Input
                                value={values.answer}
                                onChange={handleChange}
                                name={"answer"}
                                type={"text"}
                            />
                        </WithFormTitle>
                    </>
                )}
                {questionType === "Image" && (
                    <>
                        <WithFormTitle title={"Question"}>
                            <FileUploadArea
                                placeholder={"Choose image"}
                                onChange={(file: string) => onChangeImage("question", file)}
                                value={values.questionImg !== null ? values.questionImg : ""}
                                name={"questionImg"}
                            />
                        </WithFormTitle>
                        <WithFormTitle title={"Answer"}>
                            <FileUploadArea
                                name={"answerImg"}
                                onChange={(file: string) => onChangeImage("answer", file)}
                                placeholder={"Choose image"}
                                value={values.answerImg !== null ? values.answerImg : ""}
                            />
                        </WithFormTitle>
                    </>
                )}
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
