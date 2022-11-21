import React, {useState} from "react";
import {
    SSuperOption,
    SSuperOptionsList,
    SSuperSelectInput,
    SSuperSelectInputIcon,
    SSuperSelectInputWrapper,
    SSuperSelectWrapper,
} from "./styled";
import SmallArrowIcon from "../../assets/icons/SmallArrowIcon";
import {SText} from "../Text/SText";

export type TFilterOptions = "" | "Updated recently" | "Updated long ago" | "Few cards" | "Lots of cards"

type TAlternativeSuperSelect = {
    options: TFilterOptions[];
    onChangeOption: (option: TFilterOptions) => void;
    value: string;
    placeholder?: string;
    id?: string;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void
};

function Select(props: TAlternativeSuperSelect) {
    const [opened, setOpened] = useState(false);
    const [hoveredElement, setHoveredElement] = useState(props.value);

    const onKeyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        for (let i = 0; i < props.options.length; i++) {
            if (e.key === "ArrowDown" && props.options[i] === hoveredElement) {
                let verify = props.options[i + 1] || props.options[0];
                props.onChangeOption(verify);
                setHoveredElement(verify);
            }
            if (e.key === "ArrowUp" && props.options[i] === hoveredElement) {
                let verify = props.options[i - 1] || props.options[props.options.length - 1];
                props.onChangeOption(verify);
                setHoveredElement(verify);
            }
            if (e.key === "Enter" || e.key === "Escape") {
                setOpened(false);
            }
        }
    };

    const mappedOptions = props.options
        ? props.options.map((el, i) => (
            <SSuperOption
                onClick={() => onClickHandler(el)}
                onMouseEnter={() => setHoveredElement(el)}
                isHovered={hoveredElement === el}
                key={i}
            >
                {el}
            </SSuperOption>
        ))
        : []; // map

    const onClickHandler = (el: any) => {
        props.onChangeOption(el);
        setOpened(false);
    };

    const arrowPreventDefault = () => {
        window.addEventListener("keydown", (event) => {
            (event.key === "ArrowUp" || event.key === "ArrowDown") && event.preventDefault();
            // to disable scrolling with arrows
        });
    };

    const onBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
        setOpened(false)
        props.onBlur && props.onBlur(e)
    }

    return (
        <SSuperSelectWrapper
            id={props.id}
            onFocus={arrowPreventDefault}
            onKeyUp={onKeyHandler}
            tabIndex={0}
            onBlur={onBlurHandler}
        >
            <SSuperSelectInputWrapper onClick={() => setOpened(!opened)}>
                <SSuperSelectInput>
                    {props.value || <SText opacity={0.4}>{props.placeholder}</SText>}
                </SSuperSelectInput>
                <SSuperSelectInputIcon isOpen={opened}>
                    <SmallArrowIcon />
                </SSuperSelectInputIcon>
            </SSuperSelectInputWrapper>
            {opened && <SSuperOptionsList>{mappedOptions || "empty"}</SSuperOptionsList>}
        </SSuperSelectWrapper>
    );
}

export default Select;
