import React, {ChangeEvent, FocusEvent, useState} from 'react';
import {SEditableText} from "./styled";

type TEditableText = {
    text: string
    placeholder: string
    myId: number
    setText: (newText: string) => void
    maxLength: number
    title?: string
}

const EditableText: React.FC<TEditableText> = ({setText, text, myId, maxLength, ...props}) => {
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [error, setError] = useState('')

    const onBlurHandler = (e: FocusEvent<HTMLSpanElement>) => {
        let value = e.currentTarget.innerText
        if (value.length >= maxLength) {
            return setError(`the message length should not be more than ${maxLength}`)
        }
        if (error.length) setError('')
        if (value === text) return;
        setText(value.trim())
        setIsEditable(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLSpanElement>) => {
        let value = e.currentTarget.innerText
        if (value.length >= maxLength) return setError(`the message length should not be more than ${maxLength}`)
        if (error.length) setError('')
    }

    return (
        <SEditableText
            opacity={(!text && !isEditable) ? 0.3 : 1}
            onClick={() => setIsEditable(true)}
            onBlur={onBlurHandler}
            onInput={onChangeHandler}
            contentEditable={isEditable}
            suppressContentEditableWarning={isEditable}
            isError={!!error}
            error={error}
            title={props.title && props.title}
        >
            {text || (!isEditable && props.placeholder)}
        </SEditableText>

    );
};

export default EditableText;
