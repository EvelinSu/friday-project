import React from "react";

type TArrowIcon = {
    rotate?: string;
};
const SmallArrowIcon: React.FC<TArrowIcon> = ({ rotate }) => {
    return (
        <svg
            style={{ transform: `rotate(${rotate})` }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 15L12.7071 15.7071L12 16.4142L11.2929 15.7071L12 15ZM18.7071 9.70711L12.7071 15.7071L11.2929 14.2929L17.2929 8.29289L18.7071 9.70711ZM11.2929 15.7071L5.29289 9.70711L6.70711 8.29289L12.7071 14.2929L11.2929 15.7071Z"
                fill={"#a6a6a6"}
            />
        </svg>
    );
};

export default SmallArrowIcon;
