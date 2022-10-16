import styled from "styled-components";
import {Property} from "csstype";

type TBoxProps = {
    flexDirection?: Property.FlexDirection,
    alignItems?: Property.AlignItems,
    justifyContent?: Property.JustifyContent,
    gap?: string | number,
    margin?: Property.Margin,
    padding?: Property.Padding,
    backgroundColor?: Property.BackgroundColor,
    maxWidth?: Property.MaxWidth,
    width?: string | number,
    color?: Property.Color,
    height?: Property.Height,
    opacity?: Property.Opacity,
    overflow?: Property.OverflowY | Property.OverflowX,
    flexWrap?: Property.FlexWrap,
    flexGrow?: Property.FlexGrow,
}

export const Box = styled.div<TBoxProps>((props)=> ({
    display: "flex",
    flexDirection: props.flexDirection,
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    columnGap: props.gap || 30,
    rowGap: props.gap || 10,
    margin: props.margin,
    padding: props.padding,
    backgroundColor: props.backgroundColor,
    maxWidth: props.maxWidth,
    color: props.color,
    width: props.width,
    height: props.height,
    opacity: props.opacity,
    overflow: props.overflow,
    flexWrap: props.flexWrap,
    flexGrow: props.flexGrow,
}))