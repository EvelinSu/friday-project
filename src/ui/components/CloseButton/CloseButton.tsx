import React, { FC } from "react";
import { SCloseButton } from "./styled";
import CloseIcon from "../../assets/icons/CloseIcon";

type TCloseButtonProps = {
    onClick: () => void;
    padding?: string;
    color?: string;
};
const CloseButton: FC<TCloseButtonProps> = (props) => {
    return (
        <SCloseButton onClick={props.onClick} color={props.color} padding={props.padding}>
            <CloseIcon />
        </SCloseButton>
    );
};

export default CloseButton;
