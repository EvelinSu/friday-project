import React, {DetailedHTMLProps, FC} from 'react';
import {SButton} from "./styled";

export type DefaultHTMLButtonType = DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type TButtonProps = DefaultHTMLButtonType & {
    label: string,
    isDisabled?: boolean
    backgroundColor?: string
    size?: 'lg' | 'sm'
    isLoading?: boolean
    icon?: React.ReactElement
    needAuth?: boolean
    shadow?: boolean
}

const Button: FC<TButtonProps> = ({isDisabled, ...props}) => {
    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick && props.onClick(e);
    };
    return (
        <SButton
            type={props.type}
            hasIcon={!!props.icon}
            disabled={isDisabled}
            onClick={(e) => onClickHandler(e)}
            backgroundColor={props.backgroundColor}
            size={props.size}
            isLoading={props.isLoading}
            shadow={props.shadow}
        >
            {props.icon}
            {props.label}
        </SButton>
    );
};

export default Button;
