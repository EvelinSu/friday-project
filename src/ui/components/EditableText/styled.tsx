import styled from "styled-components";
import { SText } from "../Text/SText";
import {theme} from "../../styles/constants";

type TSEditableTextProps = {
    isError: boolean
    error: string
}

export const SEditableText = styled(SText)<TSEditableTextProps>((props) => ({
    display: "grid",
    borderRadius: 15,
    padding: "4px 10px",
    position: "relative",
    cursor: "pointer",
    width: "max-content",
    minWidth: 100,
    maxWidth: "100%",
    border: "1px solid transparent",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    "&:focus": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        cursor: "text",
    },
    ...props.isError && {
        border: `1px solid ${theme.colors.status.error}`,
    },
    ...props.error && {
        "&:after": {
            content: `'${props.error}'`,
            justifySelf: "center",
            position: "absolute",
            backgroundColor: theme.colors.status.error,
            fontSize: 12,
            padding: "3px 10px",
            borderRadius: 10,
            top: "calc(100% + 10px)",
            textAlign: "center",
            zIndex: 1,
        }
    }
}))

// export const SEditableTextInput = styled(SInput)(() => ({
//     borderRadius: 15,
//     padding: "3px 10px",
//     cursor: "pointer",
//     "&:hover": {
//         backgroundColor: "rgba(255, 255, 255, 0.2)",
//     }
// }))