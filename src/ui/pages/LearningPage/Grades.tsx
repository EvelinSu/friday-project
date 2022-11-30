import React from "react";
import { SLearningStar } from "./styled";
import { Stars } from "../../components/Stars/Stars";

const grades = ["Did not know", "Forgot", "A lot of thought", "Confused", "Knew the answer"];

type TGradesProps = {
    setGrade?: (num: number) => void;
    grade: number;
    isEditable?: boolean;
};

export const Grades = ({ setGrade, grade, isEditable = true }: TGradesProps) => {
    return (
        <Stars
            current={grade}
            maxCount={5}
            onChange={setGrade}
            gap={"15px"}
            render={(el, icon, onClick) => (
                <SLearningStar key={el} onClick={onClick} title={grades[el - 1]}>
                    {icon}
                </SLearningStar>
            )}
            isEditable={isEditable}
        />
    );
};
