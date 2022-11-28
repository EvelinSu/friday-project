import styled from "styled-components";
import { Property } from "csstype";

interface TSTextProps {
    isEllipsis?: boolean;
    opacity?: string | number;
    fontWeight?: Property.FontWeight;
    fontSize?: Property.FontSize;
    margin?: string;
    isLink?: boolean;
    textAlign?: Property.TextAlign;
    lineHeight?: Property.LineHeight;
    lineClamp?: number;
    maxWidth?: Property.MaxWidth;
    whiteSpace?: Property.WhiteSpace;
}

export const SText = styled.span<TSTextProps>((props) => ({
    opacity: props.opacity,
    fontWeight: props.fontWeight,
    margin: props.margin,
    maxWidth: props.maxWidth,
    fontSize: props.fontSize,
    lineHeight: props.lineHeight,
    textAlign: props.textAlign,
    whiteSpace: props.whiteSpace,
    ...(props.lineClamp && {
        display: "-webkit-box",
        webkitLineClamp: props.lineClamp,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
    }),
    ...(props.isEllipsis && {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }),
    ...(props.isLink && {
        textDecoration: "underline",
        color: props.theme.colors.button.success,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "none",
        },
    }),
}));
