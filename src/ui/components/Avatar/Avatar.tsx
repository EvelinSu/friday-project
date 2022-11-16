import React, { FC, useRef } from "react";
import { SAvatar, SAvatarDeleteIcon, SAvatarShadow } from "./styled";
import PhotoIcon from "../../assets/icons/PhotoIcon";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { changeUserProfileTC } from "../../../bll/authReducer";
import DeleteIcon from "../../assets/icons/DeleteIcon";

type TAvatarProps = {
    img: string;
    size?: "large" | "small" | "smallest";
    isEditable?: boolean;
    onClick?: () => void;
};

const Avatar: FC<TAvatarProps> = ({size, img, isEditable}) => {
    const dispatch = useAppDispatch();

    const inputFile = useRef<HTMLInputElement | null>(null);
    const {avatar} = useAppSelector((state) => state.auth.userData);
    const onButtonClick = () => {
        console.log(inputFile.current?.click());
    };

    const encodeImageFileAsURL = (event: any) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            dispatch(changeUserProfileTC({avatar: String(reader.result)}));
        };
        reader.readAsDataURL(file);
    };

    const deleteImage = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        dispatch(
            changeUserProfileTC({avatar: "https://i.imgur.com/lqN6w1t.png"})
        );
    };

    return (
        <SAvatar size={size} img={img}>
            {isEditable && (
                <SAvatarShadow onClick={onButtonClick}>
                    <input
                        type="file"
                        ref={inputFile}
                        onChange={encodeImageFileAsURL}
                        style={{display: "none"}}
                    />
                    <PhotoIcon />
                    {avatar && avatar !== 'https://i.imgur.com/lqN6w1t.png' &&
                        <SAvatarDeleteIcon
                            onClick={deleteImage}
                            title={"Delete avatar"}
                        >
                            <DeleteIcon />
                        </SAvatarDeleteIcon>
                    }
                </SAvatarShadow>
            )}
        </SAvatar>
    );
};

export default Avatar;
