import React, {FC} from 'react';
import {SIconButton} from "./styles";

type TIconButtonProps = {
    icon: React.ReactNode
}
const IconButton: FC<TIconButtonProps> = (props) => {
    return (
        <SIconButton>
            {props.icon}
        </SIconButton>
    );
};

export default IconButton;
