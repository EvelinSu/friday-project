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
        <SBackPageButton onClick={onClickHandler}>
            <IconButton icon={<LongArrowIcon />} isDark />
            {props.label && <SText opacity={0.5}>{props.label}</SText>}
        </SBackPageButton>
    );
};

const SBackPageButton = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        transform: translateX(-5px);
        opacity: 0.7;
    }
`;

export default BackPageButton;
