import styled from "styled-components";
import {theme} from "../../styles/constants";

export const SHeader = styled.div(() => ({
    display: "flex",
    color: theme.colors.text,
    backgroundColor: theme.colors.primary,
    padding: "0 20px",
    margin: 10,
    borderRadius: 20,
    overflow: "auto",
}))


export const SHeaderItem = styled.div((props) => ({
    padding: 20,
    whiteSpace: "nowrap",
    cursor: "pointer",
    "&:hover": {
        opacity: 0.4
    }
}))