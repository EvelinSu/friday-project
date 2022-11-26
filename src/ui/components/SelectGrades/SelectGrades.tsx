import React, { ChangeEvent } from "react";
import { TDefaultInputProps } from "../Form/Input";
import { SText } from "../Text/SText";
import { SCheckbox, SLabel } from "./styled";

type TCheckboxProps = TDefaultInputProps & {
    onChangeOption?: (value: string) => void;
    onChange?: (value: number) => void;
    options?: any[];
    value?: number;
};

const SelectGrades: React.FC<TCheckboxProps> = ({ options, ...props }) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeOption && props.onChangeOption(e.currentTarget.value);
        props.onChange && props.onChange(e);
    };

    const mappedOptions: any[] = options
        ? options.map((option) => (
              <SLabel key={option.id}>
                  <SCheckbox
                      type={"radio"}
                      name={option.label}
                      checked={props.value === option.value}
                      value={option.value}
                      onChange={onChangeCallback}
                  />
                  {option.label && <SText>{option.label}</SText>}
              </SLabel>
          ))
        : [];

    return <>{mappedOptions}</>;
};

export default SelectGrades;
