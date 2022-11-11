import React, {FC} from 'react';
import {SAvatar} from "./styled";

type TAvatarProps = {
    img: string,
    size?: "lg" | "sm"
}

const Avatar: FC<TAvatarProps> = ({size, img}) => {
    return (
        <SAvatar size={size} img={img}>
        </SAvatar>
    );
};

export default Avatar;
