import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import {SInput, SInputWrapper} from "./styled";
import {Box} from "../Box/Box";

export type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type TInputProps = DefaultInputPropsType & {
    icon?: React.ReactNode
    error?: string
}

const Input: React.FC<TInputProps> = ({...props}) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(e)
    }
    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        props.onBlur && props.onBlur(e)
    }
    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement> ) => {
        props.onKeyUp && props.onKeyUp(e)
    }

    return (
        <SInputWrapper error={props.error}>
            <Box opacity={0.5}>
                {props.icon}
            </Box>
            <SInput
                placeholder={props.placeholder || 'Введите текст...'}
                type={props.type}
                isError={!!props.error}
                onChange={onChange}
                onKeyUp={onKeyUp}
                name={props.name}
                value={props.value}
                onBlur={onBlur}
                onError={props.onError}
            />
        </SInputWrapper>
    );
};

export default Input;
