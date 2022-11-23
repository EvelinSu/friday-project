import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";
import {SInput, SInputLeftIcon, SInputRightIcon, SInputWrapper} from "./styled";

export type TDefaultInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>;
export type TInputProps = TDefaultInputProps & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    error?: string;
    ref?: string;
};

const Input: React.FC<TInputProps> = ({...props}) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(e);
    };
    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        props.onBlur && props.onBlur(e);
    };
    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        props.onKeyUp && props.onKeyUp(e);
    };

    return (
        <SInputWrapper error={props.error}>
            {props.leftIcon && <SInputLeftIcon>{props.leftIcon}</SInputLeftIcon>}
            <SInput
                placeholder={props.placeholder || ""}
                type={props.type}
                isError={!!props.error}
                onChange={onChange}
                onKeyUp={onKeyUp}
                name={props.name}
                value={props.value}
                onBlur={onBlur}
                onError={props.onError}
                hasLeftIcon={!!props.leftIcon}
                hasRightIcon={!!props.rightIcon}
            />
            {props.rightIcon && <SInputRightIcon>{props.rightIcon}</SInputRightIcon>}
        </SInputWrapper>
    );
};

export default Input;
