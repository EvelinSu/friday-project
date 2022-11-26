import React from "react";
import SelectGrades from "../../components/SelectGrades/SelectGrades";

const grades = [
    { id: "1", value: 1, label: "Did not know" },
    { id: "2", value: 2, label: "Forgot" },
    { id: "3", value: 3, label: "A lot of thought" },
    { id: "4", value: 4, label: "Confused" },
    { id: "5", value: 5, label: "Knew the answer" },
];

type TGradesProps = {
    setGrade: (value: number) => void;
    grade: number;
};

export const Grades = ({ setGrade, grade }: TGradesProps) => {
    const onChangeOption = (value: string) => {
        setGrade(+value);
    };

    return <SelectGrades options={grades} value={grade} onChangeOption={onChangeOption} />;
};
