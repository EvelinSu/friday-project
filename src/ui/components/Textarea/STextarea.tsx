import styled from "styled-components";
import {theme} from "../../styles/constants";
import {Property} from "csstype";

export type TSTextarea = {
    height?: Property.Height
}
export const STextarea = styled.textarea<TSTextarea>((props) => ({
    height: props.height || 150,
    borderRadius: theme.blockSettings.borderRadius,
    backgroundColor: "rgba(255,255,255, 0.05)",
    padding: "10px 15px",
    width: "100%",
    border: "1px solid transparent",
    "::placeholder":{
        color: theme.colors.text,
        opacity: 0.3
    },
    "&:hover":{
        backgroundColor: "rgba(255,255,255, 0.1)",
    },
    "&:focus":{
        backgroundColor: "rgba(255,255,255, 0.1)",
        border: "1px solid rgba(255,255,255, 0.1)",

    }
}))