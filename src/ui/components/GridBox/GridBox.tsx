import styled from "styled-components";
import {Property} from "csstype";

type TGridBoxProps = {
    columns?: Property.GridTemplateColumns
    padding?: Property.Padding;
};
export const GridBox = styled.div<TGridBoxProps>((props) => ({
    display: "grid",
    padding: props.padding,
    gridTemplateColumns: `${props.columns}`,
    gap: 20
}));
