import React, {DetailedHTMLProps, FC, InputHTMLAttributes, useState} from "react";
import EditIcon from "../../assets/icons/EditIcon";
import {SEditableSpanInput, SEditableSpanInputWrapper, SEditableSpanText} from "./styled";
import CircleDoneIcon from "../../assets/icons/CircleDoneIcon";
import {SText} from "../Text/SText";
import {TEventInput} from "../../pages/ProfilePage/ProfilePage";

export type TDefaultInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>;

type TEditableSpanProps = TDefaultInputProps & {
    value?: string | null;
    fontSize?: string;
    onSave?: () => void;
};
const EditableSpan: FC<TEditableSpanProps> = (props) => {
    const [isEditable, setIsEditable] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const saveChanges = () => {
        setIsDisabled(true);
        setIsEditable(false);
        props.onSave && props.onSave();
        setTimeout(() => {
            setIsDisabled(false);
        }, 1000);
    };

    const onChange = (e: TEventInput) => {
        if (e.key === "Enter") {
            saveChanges();
        } else {
            props.onChange && props.onChange(e);
        }
    };

    return !isEditable ? (
        <SEditableSpanText disabled={isDisabled} onClick={() => setIsEditable(true)}>
            {props.value ? (
                <SText title={props.value ? props.value : ""} fontSize={props.fontSize} isEllipsis>
                    {props.value}
                </SText>
            ) : (
                <SText opacity={0.4} fontSize={props.fontSize} isEllipsis>
                    {props.placeholder}
                </SText>
            )}
            <EditIcon />
        </SEditableSpanText>
    ) : (
        <SEditableSpanInputWrapper disabled={isDisabled}>
            <SEditableSpanInput
                onBlur={saveChanges}
                autoFocus
                onKeyDown={onChange}
                onChange={onChange}
                value={props.value ? props.value : ""}
            />
            <CircleDoneIcon onClick={saveChanges} />
        </SEditableSpanInputWrapper>
    );
};

export default EditableSpan;
