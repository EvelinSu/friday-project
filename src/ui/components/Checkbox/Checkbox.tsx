import React, {ChangeEvent} from 'react';
import {DefaultInputPropsType} from "../Form/Input";
import { SText } from '../Text/SText';
import {SCheckbox, SLabel} from "./styled";


type TCheckboxProps =  DefaultInputPropsType & {
    label: string
    onChangeChecked?: (checked: boolean) => void

}

const Checkbox: React.FC<TCheckboxProps> = (props) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeChecked && props.onChangeChecked(e.currentTarget.checked)
        props.onChange && props.onChange(e)
    }

    return (
        <SLabel>
            <SCheckbox
                type={"checkbox"}
                name={props.name}
                checked={props.checked}
                onChange={onChangeCallback}
            />
            {props.label && <SText>{props.label}</SText>}

        </SLabel>
    );
};

export default Checkbox;
