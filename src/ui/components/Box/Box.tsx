import styled from "styled-components";
import { Property } from "csstype";

type TBoxProps = {
    flexDirection?: Property.FlexDirection;
    alignItems?: Property.AlignItems;
    justifyContent?: Property.JustifyContent;
    gap?: string | number;
    margin?: Property.Margin;
    padding?: Property.Padding;
    backgroundColor?: Property.BackgroundColor;
    maxWidth?: Property.MaxWidth;
    width?: string | number;
    color?: Property.Color;
    height?: Property.Height;
    maxHeight?: Property.MaxHeight;
    opacity?: Property.Opacity;
    overflow?: Property.OverflowY | Property.OverflowX;
    flexWrap?: Property.FlexWrap;
    flexGrow?: Property.FlexGrow;
    cursor?: Property.Cursor;
    position?: Property.Position;
    disabled?: boolean;
};

export const Box = styled.div<TBoxProps>((props) => ({
    display: "flex",
    flexDirection: props.flexDirection,
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    columnGap: props.gap || 20,
    rowGap: props.gap || 20,
    margin: props.margin,
    padding: props.padding,
    backgroundColor: props.backgroundColor,
    maxWidth: props.maxWidth,
    color: props.color,
    width: props.width,
    height: props.height,
    maxHeight: props.maxHeight,
    opacity: props.opacity,
    overflow: props.overflow,
    flexWrap: props.flexWrap,
    flexGrow: props.flexGrow,
    position: props.position,
    cursor: props.cursor,
    ...(props.cursor === "pointer" && {
        "&:hover": {
            opacity: 0.8,
        },
    }),
}));
