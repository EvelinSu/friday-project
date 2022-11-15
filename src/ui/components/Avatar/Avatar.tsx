import React, { FC, useRef } from "react";
import { SAvatar, SAvatarShadow } from "./styled";
import PhotoIcon from "../../assets/icons/PhotoIcon";
import { useAppDispatch } from "../../../hooks/hooks";
import { changeUserProfileTC } from "../../../bll/authReducer";

type TAvatarProps = {
    img: string;
    size?: "large" | "small" | "smallest";
    isEditable?: boolean;
    onClick?: () => void;
};

const Avatar: FC<TAvatarProps> = ({ size, img, isEditable }) => {
    const dispatch = useAppDispatch();

    const inputFile = useRef<HTMLInputElement | null>(null);
    const onButtonClick = () => {
        console.log(inputFile.current?.click());
    };

    function encodeImageFileAsURL(event: any) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            dispatch(changeUserProfileTC({ avatar: String(reader.result) }));
        };
        reader.readAsDataURL(file);
    }

    return (
        <SAvatar size={size} img={img}>
            {isEditable && (
                <SAvatarShadow onClick={onButtonClick}>
                    <input
                        type="file"
                        ref={inputFile}
                        onChange={encodeImageFileAsURL}
                        style={{ display: "none" }}
                    />
                    <PhotoIcon />
                </SAvatarShadow>
            )}
        </SAvatar>
    );
};

export default Avatar;
