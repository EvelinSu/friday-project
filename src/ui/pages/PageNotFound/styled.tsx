import styled from "styled-components";
import {theme} from "../../styles/constants";

export const SPageNotFound = styled.div((props) => ({
    display:"flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: '80vh',
}))

export const SPageNotFoundTitle = styled.h1((props) => ({
    fontSize: 100,
    color: theme.colors.primaryLightest,
    margin: 0,
    textAlign: "center",
}))
export const SPageNotFoundImage = styled.img((props) => ({
    position: "fixed",
    bottom: 0,
    left: 0,
    width: 500,
    height: 500,
}))