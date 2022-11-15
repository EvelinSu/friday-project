import React, { FC } from "react";
import { SCloseButton } from "./styled";
import CloseIcon from "../../assets/icons/CloseIcon";

type TCloseButtonProps = {
    onClick: () => void;
    color: string;
};
const CloseButton: FC<TCloseButtonProps> = (props) => {
    return (
        <SCloseButton onClick={props.onClick} color={props.color}>
            <CloseIcon />
        </SCloseButton>
    );
};

export default CloseButton;
