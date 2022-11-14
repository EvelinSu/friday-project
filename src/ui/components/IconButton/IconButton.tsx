import React, { FC } from "react";
import { SIconButton } from "./styles";

type TIconButtonProps = {
    icon: React.ReactNode;
    isDark?: boolean;
    color?: string;
    size?: "sm";
    onClick?: () => void;
    title?: string;
};
const IconButton: FC<TIconButtonProps> = (props) => {
    const onClickHandler = () => {
        props.onClick && props.onClick();
    };

    return (
        <SIconButton
            title={props.title}
            onClick={onClickHandler}
            size={props.size}
            color={props.color}
            isDark={props.isDark}
        >
            {props.icon}
        </SIconButton>
    );
};

export default IconButton;
