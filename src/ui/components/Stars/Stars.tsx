import React, { FC } from "react";
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
export const Stars: FC<TStarsProps> = ({ current = 1, ...props }) => {
    const onClickHandler = (el: number) => {
        props.onChange && props.onChange(el);
    };

    const icon = (el: number) => <StarIcon className={el <= current ? "isFill" : ""} />;
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
