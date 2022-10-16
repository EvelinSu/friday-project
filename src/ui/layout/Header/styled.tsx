import styled from "styled-components";
import {theme} from "../../styles/constants";

export const SHeader = styled.div(() => ({
    display: "flex",
    color: theme.colors.text,
    backgroundColor: theme.colors.primary,
    padding: "0 20px"
}))


export const SHeaderItem = styled.div(() => ({
    padding: 20,
    cursor: "pointer",
    "&:hover": {
        opacity: 0.4
    }
}))