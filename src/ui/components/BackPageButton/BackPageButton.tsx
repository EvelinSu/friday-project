import React, { FC } from "react";
import IconButton from "../IconButton/IconButton";
import LongArrowIcon from "../../assets/icons/LongArrowIcon";
import { SText } from "../Text/SText";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type TBackPageButtonProps = {
    to: string;
};
const BackPageButton: FC<TBackPageButtonProps> = (props) => {
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate(props.to);
    };

    return (
        <SBackPageButton onClick={onClickHandler}>
            <IconButton icon={<LongArrowIcon />} isDark />
            <SText opacity={0.5}>Back to Packs List</SText>
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
