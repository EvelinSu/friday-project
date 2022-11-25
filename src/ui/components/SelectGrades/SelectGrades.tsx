import React, { ChangeEvent } from "react";
import { TDefaultInputProps } from "../Form/Input";
import { SText } from "../Text/SText";
import { SCheckbox, SLabel } from "./styled";
import { grade } from "../../pages/LearningPage/Grades";

type TCheckboxProps = TDefaultInputProps & {
    onChangeOption?: (value: string) => void;
    onChange?: (value: number) => void;
    grades?: grade[];
    value?: number;
};

const SelectGrades: React.FC<TCheckboxProps> = ({ grades, ...props }) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeOption && props.onChangeOption(e.currentTarget.value);
        props.onChange && props.onChange(e);
    };

    const mappedOptions: any[] = grades
        ? grades.map((grade) => (
              <SLabel key={grade.id}>
                  <SCheckbox
                      type={"radio"}
                      name={grade.label}
                      checked={props.value === grade.value}
                      value={grade.value}
                      onChange={onChangeCallback}
                  />
                  {grade.label && <SText>{grade.label}</SText>}
              </SLabel>
          ))
        : [];

    return <>{mappedOptions};</>;
};

export default SelectGrades;
