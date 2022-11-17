import React, { FC } from "react";
import ViewIcon from "../../assets/icons/ViewIcon";
import ViewHideIcon from "../../assets/icons/ViewHideIcon";
import styled from "styled-components";

type TViewIconHandler = {
    onClick: () => void;
    isVisible: boolean;
};

const ViewInputIcon: FC<TViewIconHandler> = ({ onClick, isVisible }) => {
    const onViewClickHandler = () => {
        onClick && onClick();
    };

    return (
        <SPasswordIcon
            title={!isVisible ? "Show password" : "Hide password"}
            onClick={onViewClickHandler}
        >
            {!isVisible ? <ViewIcon /> : <ViewHideIcon />}
        </SPasswordIcon>
    );
};

export default ViewInputIcon;

const SPasswordIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
`;
