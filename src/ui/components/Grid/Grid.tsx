import styled from "styled-components";
import {Box} from "../Box/Box";

type TGridProps = {
    columns?: string,
    rows?: string,
    gap?: string | number
}

export const Grid = styled(Box)<TGridProps>((props) => ({
    display: "grid",
    gridTemplateColumns: props.columns,
    gridTemplateRows: props.rows,
    gap: props.gap || 20,
    rowGap: props.gap || 20,
    columnGap: props.gap || 20,

}))