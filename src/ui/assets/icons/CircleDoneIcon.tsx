import React, { FC } from "react";

type TCircleDoneIconProps = {
    onClick?: () => void;
};
const CircleDoneIcon: FC<TCircleDoneIconProps> = (props) => {
    const onClickHandler = () => {
        props.onClick && props.onClick();
    };

    return (
        <svg
            onClick={onClickHandler}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="12" cy="12" r="9" stroke="#7398CE" strokeOpacity="0.71" strokeWidth="2" />
            <path d="M8 12L11 15L16 9" stroke="#7398CE" strokeOpacity="0.71" strokeWidth="2" />
        </svg>
    );
};

export default CircleDoneIcon;
