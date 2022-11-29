import React, { FC } from "react";
import { SUiBoxBody, SUiBoxContainer, SUiBoxHeader } from "./styled";
import { Box } from "../Box/Box";
import { Property } from "csstype";

type TUiBoxProps = {
    title: string;
    maxWidth?: string;
    width?: string;
    margin?: string;
    height?: string;
    children: React.ReactNode;
    overflow?: Property.Overflow;
};

export const UiBox: FC<TUiBoxProps> = (props) => {
    return (
        <SUiBoxContainer
            height={props.height}
            margin={props.margin}
            width={props.width}
            maxWidth={props.maxWidth}
            overflow={props.overflow}
            onClick={(e) => e.stopPropagation()}
        >
            <Box>
                <SUiBoxHeader lineClamp={2}>{props.title}</SUiBoxHeader>
            </Box>
            <SUiBoxBody>{props.children}</SUiBoxBody>
        </SUiBoxContainer>
    );
};
