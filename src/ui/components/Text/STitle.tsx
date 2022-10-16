import styled from "styled-components";
import {SText} from "./SText";


type TSTitleProps = {
    color?: string
    fontSize?: string | number
}
export const STitle = styled(SText)<TSTitleProps>((props) => ({
    fontWeight: "bold",
    fontSize: props.fontSize || 18,
    color: props.color
}))