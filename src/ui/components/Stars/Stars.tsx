import React, {FC, useState} from 'react';
import {StarIcon} from "../../assets/icons/StarIcon";
import {StarFillIcon} from "../../assets/icons/StarFillIcon";
import {SStar, SStarsWrapper} from "./styled";

type TStarsProps = {
    current: number
    maxCount: number
    isEditable: boolean
}
export const Stars: FC<TStarsProps> = (props) => {

    const [currentStar, setCurrentStar] = useState(props.current || 0)

    const starsCount = []
    for (let i = 0; i < props.maxCount; i++) starsCount.push(i)

    return (
        <SStarsWrapper isEditable={props.isEditable}>
            {starsCount.map(el => (
                <SStar key={el} onClick={() => el === currentStar ? setCurrentStar(el - 1) : setCurrentStar(el)}>
                    {el > currentStar ? <StarIcon /> : <StarFillIcon />}
                </SStar>
            ))}
        </SStarsWrapper>
    );
};

