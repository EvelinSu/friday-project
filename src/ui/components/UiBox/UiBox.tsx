import React, { FC } from "react";
import { SUiBoxBody, SUiBoxContainer, SUiBoxHeader } from "./styled";
import { Box } from "../Box/Box";

type TUiBoxProps = {
    title: string;
    maxWidth?: string;
    width?: string;
    margin?: string;
    height?: string;
    children: React.ReactNode;
};

export const UiBox: FC<TUiBoxProps> = (props) => {
    return (
        <SUiBoxContainer
            height={props.height}
            margin={props.margin}
            width={props.width}
            maxWidth={props.maxWidth}
            onClick={(e) => e.stopPropagation()}
        >
            <Box>
                <SUiBoxHeader lineClamp={2}>{props.title}</SUiBoxHeader>
            </Box>
            <SUiBoxBody>{props.children}</SUiBoxBody>
        </SUiBoxContainer>
    );
};
