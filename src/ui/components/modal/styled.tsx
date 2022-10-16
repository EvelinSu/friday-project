import styled from "styled-components";
import {theme} from "../../styles/constants";

export const SModalWrapper = styled.div((props) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    gap: 30,
    padding: "40px 30px",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.blockSettings.borderRadius,
    maxWidth: 350,
    width: "100%",
}))