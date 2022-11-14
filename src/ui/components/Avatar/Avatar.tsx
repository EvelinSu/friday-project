import React, { FC } from "react";
import { SAvatar, SAvatarShadow } from "./styled";
import PhotoIcon from "../../assets/icons/PhotoIcon";

type TAvatarProps = {
    img: string;
    size?: "lg" | "sm";
    isEditable?: boolean;
    onClick?: () => void;
};

const Avatar: FC<TAvatarProps> = ({ size, img, isEditable, onClick }) => {
    const onClickHandler = () => {
        onClick && onClick();
    };

    return (
        <SAvatar size={size} img={img}>
            {isEditable && (
                <SAvatarShadow onClick={onClickHandler}>
                    <PhotoIcon />
                </SAvatarShadow>
            )}
        </SAvatar>
    );
};

export default Avatar;
