import React from 'react';
import {TIconsProps} from "./types";
import styled from "styled-components";



const ArrowIcon: React.FC<TIconsProps> = (props) => {

    const onClickHandler = () => props.onClick && props.onClick()

    return (
        <SArrowIcon isDisabled={props.isDisabled} transform={props.rotate} onClick={onClickHandler}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L8.29289 11.2929L7.58579 12L8.29289 12.7071L9 12ZM14.2929 5.29289L8.29289 11.2929L9.70711 12.7071L15.7071 6.70711L14.2929 5.29289ZM8.29289 12.7071L14.2929 18.7071L15.7071 17.2929L9.70711 11.2929L8.29289 12.7071Z"
                      fill="#CCD2E3"
                />
            </svg>
        </SArrowIcon>


    );
};

export default ArrowIcon;

type TSArrowIconProps = {
    transform?: string
    isDisabled?: boolean
}

const SArrowIcon = styled.div<TSArrowIconProps>((props) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: `rotate(${props.transform || 0})`,
    height: "min-content",
    cursor: "pointer",
    transition: "0.2s",
    "&:hover":{
        transform: `rotate(${props.transform || 0}) translateX(-5px)`
    },
    ...props.isDisabled && {
        opacity: 0.2,
        pointerEvents: "none",
    }
}))