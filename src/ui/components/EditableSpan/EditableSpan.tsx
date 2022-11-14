import React, {
    DetailedHTMLProps,
    FC,
    InputHTMLAttributes,
    KeyboardEvent,
    useState,
} from "react";
import EditIcon from "../../assets/icons/EditIcon";
import {
    SEditableSpanInput,
    SEditableSpanInputWrapper,
    SEditableSpanText,
} from "./styled";
import CircleDoneIcon from "../../assets/icons/CircleDoneIcon";
import { SText } from "../Text/SText";

export type DefaultInputPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

type TEditableSpanProps = DefaultInputPropsType & {
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
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        props.onKeyDown && props.onKeyDown(e);
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(e);
    };

    return !isEditable ? (
        <SEditableSpanText
            disabled={isDisabled}
            onClick={() => setIsEditable(true)}
        >
            {props.value ? (
                <SText
                    title={props.value ? props.value : ""}
                    fontSize={props.fontSize}
                    isEllipsis
                >
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
                onKeyDown={onKeyDown}
                onChange={onChange}
                value={props.value ? props.value : ""}
            />
            <CircleDoneIcon onClick={saveChanges} />
        </SEditableSpanInputWrapper>
    );
};

export default EditableSpan;
