import styled from "styled-components";
import { Property } from "csstype";

type TGridBoxProps = {
    padding: Property.Padding;
};
export const GridBox = styled.div<TGridBoxProps>((props) => ({
    padding: props.padding,
}));
