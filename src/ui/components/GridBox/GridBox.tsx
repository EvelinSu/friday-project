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
    gridTemplateColumns: `${props.columns}`,
    gridTemplateRows: `${props.rows}`,
    gap: 20,
    overflow: "auto",
    borderRadius: 15,
}));
