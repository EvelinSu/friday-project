import styled from "styled-components";

export const SScrollContainer = styled.div((props) => ({
    display: "flex",
    flexDirection: "column",
    gap: 20,
    overflowY: "auto",
    overflowX: "hidden",
    padding: 20,
}))