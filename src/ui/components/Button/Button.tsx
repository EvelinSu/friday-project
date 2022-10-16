import React, {FC} from 'react';
import {DefaultHTMLButtonType, SButton, SLoadingButton} from "./styled";

type TButtonProps = DefaultHTMLButtonType & {
    label: string,
    isDisabled?: boolean
    backgroundColor?: string
    size?: 'lg' | 'sm'
    isLoading?: boolean
    icon?: React.ReactElement
    needAuth?: boolean
}

const Button: FC<TButtonProps> = ({isDisabled, ...props}) => {
    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick && props.onClick(e);
    };
    return (
        !props.isLoading
            ? (<SButton
                type={props.type}
                hasIcon={!!props.icon}
                disabled={isDisabled}
                onClick={(e) => onClickHandler(e)}
                backgroundColor={props.backgroundColor}
                size={props.size}
            >
                {props.icon}
                {props.label}
            </SButton>)
            : (<SLoadingButton>
                {props.label}
            </SLoadingButton>)

    );
};

export default Button;
