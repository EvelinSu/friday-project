import React, { FC, useEffect, useState } from "react";
import { StarIcon } from "../../assets/icons/StarIcon";
import { SStar, SStarsWrapper } from "./styled";
import { getCountArray } from "../../../common/utils/getCountArray";

type TStarsProps = {
    current: number;
    maxCount: number;
    isEditable: boolean;
    onChange?: (num: number) => void;
    render?: (num: number, icon: React.ReactNode, onClick: () => void) => React.ReactNode;
    gap?: string;
};
export const Stars: FC<TStarsProps> = ({ current = 0, ...props }) => {
    const [currentGrade, setCurrentGrade] = useState(current);

    const onClickHandler = (el: number) => {
        if (el !== current) props.onChange && props.onChange(el);
    };

    useEffect(() => {
        setCurrentGrade(current);
    }, [current]);

    const icon = (el: number) => <StarIcon className={el <= currentGrade ? "isFill" : ""} />;
    return (
        <SStarsWrapper gap={props.gap} isEditable={props.isEditable}>
            {getCountArray(props.maxCount).map((el) =>
                props.render ? (
                    props.render(el, icon(el), () => onClickHandler(el))
                ) : (
                    <SStar key={el} onClick={() => onClickHandler(el)}>
                        {icon(el)}
                    </SStar>
                )
            )}
        </SStarsWrapper>
    );
};
