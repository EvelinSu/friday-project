import React, { FC } from "react";
import { SUiBoxBody, SUiBoxContainer, SUiBoxFooter, SUiBoxHeader } from "./styled";

type TUiBoxProps = {
    title: string;
    body: React.ReactNode;
    footer?: React.ReactNode;
    width?: string;
    height?: string;
};

export const UiBox: FC<TUiBoxProps> = (props) => {
    return (
        <SUiBoxContainer height={props.height} width={props.width} onClick={(e) => e.stopPropagation()}>
            <SUiBoxHeader lineClamp={2}>{props.title}</SUiBoxHeader>
            <SUiBoxBody>{props.body}</SUiBoxBody>
            {props.footer && <SUiBoxFooter>{props.footer}</SUiBoxFooter>}
        </SUiBoxContainer>
    );
};
