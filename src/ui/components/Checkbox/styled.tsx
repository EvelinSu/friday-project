import styled from "styled-components";

export const SLabel = styled.label({
    display: "flex",
    alignItems: "center",
    justifyContent: "inherit",
});

export const SCheckbox = styled.input((props) => ({
    appearance: "none",
    padding: 10,
    width: 20,
    height: 20,
    alignSelf: "center",
    backgroundColor: props.theme.colors.input.default,
    borderRadius: 50,
    border: `1px solid rgba(0, 0, 0, 0.2)`,
    marginRight: 10,
    position: "relative",
    cursor: "pointer",
    "&:checked": {
        appearance: "none",
        height: 0,
        width: 0,
        "&:after": {
            content: '""',
            backgroundColor: props.theme.colors.button.success,
            position: "absolute",
            top: 6,
            bottom: 6,
            left: 6,
            right: 6,
            borderRadius: 50,
        },
    },
}));
