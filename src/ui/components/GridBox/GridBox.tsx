import styled from "styled-components";
import { Property } from "csstype";

type TGridBoxProps = {
    columns?: Property.GridTemplateColumns;
    rows?: Property.GridTemplateRows;
    padding?: Property.Padding;
};
export const GridBox = styled.div<TGridBoxProps>((props) => ({
    display: "grid",
    padding: props.padding,
    gridTemplateColumns: props.columns,
    gridTemplateRows: props.rows,
    gap: 20,
    overflow: "auto",
    borderRadius: 15,
}));

export const SGridDefaultBlock = styled.div<{ minHeight: string }>((props) => ({
    width: "100%",
    height: "100%",
    backgroundColor: props.theme.colors.cards.skeleton,
    borderRadius: 15,
    minHeight: props.minHeight,
}));
