import styled from "styled-components";

export const SLabel = styled.label(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "inherit"
}))

export const SCheckbox = styled.input`
    appearance: none;
    padding: 10px;
    width: 20px;
    height: 20px;
    align-self: center;
    background-color: ${({theme}) => theme.colors.input.default};
    border-radius: 50%;
    margin-right: 10px;
    position: relative;
    cursor: pointer;
    &:checked {
        appearance: none;
        height: 0;
        width: 0;
        &:after {
            content: '';
            background-color: ${({theme}) => theme.colors.primary};
            position: absolute;
            top: 6px;
            bottom: 6px;
            left: 6px;
            right: 6px;
            border-radius: 50%;
        }
    }
`