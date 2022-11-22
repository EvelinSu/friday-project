import React, {useEffect, useMemo, useState} from "react";
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
import {useSearchParams} from "react-router-dom";
import {getUrlParams} from "../../../common/utils/getUrlParams";

export type TFilterOptions =
    | ""
    | "Updated recently"
    | "Updated long ago"
    | "Few cards"
    | "Lots of cards";

type TAlternativeSuperSelect = {
    options: string[];
    onChangeOption: (option: string) => void;
    value: string;
    placeholder?: string;
    id?: string;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
    padding?: string
    title?: string
    color?: string
};

function Select(props: TAlternativeSuperSelect) {
    const [opened, setOpened] = useState(false);
    const [hoveredElement, setHoveredElement] = useState(props.value);

    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

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
        setOpened(false);
        props.onBlur && props.onBlur(e);
    };

    useEffect(() => {
        switch (props.value) {
            case "Updated recently":
                setSearchParams({
                    ...URLParams,
                    sortPacks: "0updated",
                });
                props.onChangeOption(props.value);
                break;
            case "Updated long ago":
                setSearchParams({
                    ...URLParams,
                    sortPacks: "1updated",
                });
                break;
            case "Few cards":
                setSearchParams({
                    ...URLParams,
                    sortPacks: "1cardsCount",
                });
                break;
            case "Lots of cards":
                setSearchParams({
                    ...URLParams,
                    sortPacks: "0cardsCount",
                });
                break;
        }
    }, [props.value]);

    return (
        <SSuperSelectWrapper
            id={props.id}
            onFocus={arrowPreventDefault}
            onKeyUp={onKeyHandler}
            title={props.title}
            tabIndex={0}
            onBlur={onBlurHandler}
        >
            <SSuperSelectInputWrapper
                padding={props.padding}
                onClick={() => setOpened(!opened)}
                color={props.color}
            >
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
