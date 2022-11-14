import React, {FC} from 'react';
import {SIconButton} from "./styles";

type TIconButtonProps = {
    icon: React.ReactNode
    isDark?: boolean
}
const IconButton: FC<TIconButtonProps> = (props) => {
    return (
        <SIconButton isDark={props.isDark}>
            {props.icon}
        </SIconButton>
    );
};

export default IconButton;
