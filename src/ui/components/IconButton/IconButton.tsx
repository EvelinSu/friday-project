import React, { FC } from "react";
import { SIconButton } from "./styles";

type TIconButtonProps = {
    icon: React.ReactNode;
    isDark?: boolean;
    isLightest?: boolean;
    color?: string;
    size?: "sm";
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    title?: string;
    isDisabled?: boolean;
};
const IconButton: FC<TIconButtonProps> = (props) => {
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        props.onClick && props.onClick(e);
    };

    return (
        <SIconButton
            title={props.title}
            onClick={onClickHandler}
            size={props.size}
            color={props.color}
            isDark={props.isDark}
            isLightest={props.isLightest}
            isDisabled={props.isDisabled}
        >
            {props.icon}
        </SIconButton>
    );
};

export default IconButton;
