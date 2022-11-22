import styled from "styled-components";
import {Property} from "csstype";

type TGridBoxProps = {
    columns?: Property.GridTemplateColumns;
    rows?: Property.GridTemplateRows;
    padding?: Property.Padding;
};
export const GridBox = styled.div<TGridBoxProps>((props) => ({
    display: "grid",
    padding: props.padding,
    gridTemplateColumns: `${props.columns}`,
    gridTemplateRows: `${props.rows}`,
    gap: 20,
    overflow: "auto",
    borderRadius: 15,
}));

export const SGridDefaultBlock = styled.div<{ minHeight: string }>`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.cards.skeleton};
    border-radius: 15px;
    min-height: ${props => props.minHeight};
`