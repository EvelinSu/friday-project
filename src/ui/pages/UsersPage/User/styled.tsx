import styled from "styled-components";

export const SUserWrapper = styled.div((props) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
    background: props.theme.colors.secondaryLight,
}));
