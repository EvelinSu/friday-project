import React, { FC } from "react";
import IconButton from "../IconButton/IconButton";
import LongArrowIcon from "../../assets/icons/LongArrowIcon";
import { SText } from "../Text/SText";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TCardsParams, TPacksParams } from "../../../dal/ResponseTypes";

type TBackPageButtonProps = {
    to?: string | -1;
    onClick?: () => void;
    params?: TPacksParams | TCardsParams | "";
    label?: string;
    isDisabled?: boolean;
};
const BackPageButton: FC<TBackPageButtonProps> = (props) => {
    const navigate = useNavigate();

    const onClickHandler = () => {
        let params: string[] = [];
        if (props.params) {
            Object.entries(props.params).forEach((el) => el[1] !== "" && params.push(el.join("=")));
            const validParams = params.join("&");
            navigate(props.to + `?${validParams}`);
        }
        if (props.to === -1) {
            navigate(props.to);
        }
        props.onClick && props.onClick();
    };

    return (
        <SBackPageButton onClick={onClickHandler} isDisabled={props.isDisabled}>
            <IconButton icon={<LongArrowIcon />} allowPropagation isDark />
            {props.label && (
                <SText isEllipsis opacity={0.5}>
                    {props.label}
                </SText>
            )}
        </SBackPageButton>
    );
};

const SBackPageButton = styled.div<{ isDisabled?: boolean }>((props) => ({
    display: "flex",
    gap: "15px",
    alignItems: "center",
    color: props.theme.colors.textOnSecondary,
    transition: "0.2s",
    cursor: "pointer",
    overflow: "hidden",
    "&:hover": {
        transform: "translateX(-5px)",
        opacity: 0.7,
    },
    ...(props.isDisabled && {
        pointerEvents: "none",
        opacity: 0.7,
    }),
}));

export default BackPageButton;
