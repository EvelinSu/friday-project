import React, { FC, useState } from "react";
import {
    SPageCountDropdown,
    SPageCountDropdownItem,
    SPageCountDropdownSelectedItem,
    SPageCountDropdownWrapper,
} from "./styled";
import SmallArrowIcon from "../../assets/icons/SmallArrowIcon";

type TPageCountDropdownProps = {
    pageCounts: number[];
    activeCount: number;
    onClick: (pageCount: number) => void;
    isDisabled?: boolean;
};
export const PageCountDropdown: FC<TPageCountDropdownProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const onItemClickHandler = (el: number) => {
        setIsOpen(false);
        props.onClick(el);
    };

    return (
        <SPageCountDropdownWrapper
            tabIndex={0}
            onBlur={() => setIsOpen(false)}
            title={"Number of cards per page"}
        >
            <SPageCountDropdownSelectedItem onClick={() => setIsOpen(!isOpen)}>
                {props.activeCount}
                <SmallArrowIcon rotate={isOpen ? "0deg" : "180deg"} />
            </SPageCountDropdownSelectedItem>
            {isOpen && (
                <SPageCountDropdown>
                    {props.pageCounts.map((el) => (
                        <SPageCountDropdownItem
                            key={el}
                            isDisabled={props.isDisabled}
                            onClick={() => onItemClickHandler(el)}
                            isActive={props.activeCount === el}
                        >
                            {el}
                        </SPageCountDropdownItem>
                    ))}
                </SPageCountDropdown>
            )}
        </SPageCountDropdownWrapper>
    );
};
