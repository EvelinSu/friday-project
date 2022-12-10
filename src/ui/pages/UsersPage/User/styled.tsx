import styled from "styled-components";

export const SUserWrapper = styled.div((props) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    gap: 10,
    background: props.theme.colors.secondaryLight,
}));
