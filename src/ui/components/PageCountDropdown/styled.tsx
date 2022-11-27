import styled from "styled-components";
import { SSuperOption, SSuperOptionsList } from "../Select/styled";

export const SPageCountDropdownWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    border-radius: 10px;
    width: 55px;
`;

export const SPageCountDropdownSelectedItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 5px 5px 10px;
    border-radius: inherit;
    gap: 5px;
    width: 100%;
    column-gap: 5px;
    cursor: pointer;
    font-size: 12px;
    color: ${(props) => props.theme.colors.textOnPrimary};
    background-color: ${(props) => props.theme.colors.primary};
    transition: 0.2s;

    svg {
        width: 18px;
        height: 18px;
        opacity: 0.5;

        path {
            fill: ${(props) => props.theme.colors.textOnPrimary};
        }
    }

    &:hover {
        opacity: 0.8;
    }
`;
export const SPageCountDropdown = styled(SSuperOptionsList)`
    text-align: center;
    flex-direction: column;
    position: absolute;
    bottom: calc(100% + 10px);
    width: 100%;
    top: initial;
    z-index: ${(props) => props.theme.orders.dropdown};
`;

type TSPageCountDropdownItemProps = {
    isActive?: boolean;
    isDisabled?: boolean;
};
export const SPageCountDropdownItem = styled(SSuperOption)<TSPageCountDropdownItemProps>((props) => ({
    display: "flex",
    height: "max-content",
    padding: "5px",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: "inherit",
    cursor: "pointer",
    ...(props.isActive && {
        pointerEvents: "none",
        transform: "scale(0.8)",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
    }),
    ...(props.isDisabled && {
        pointerEvents: "none",
        opacity: 0.4,
    }),
    "&:hover": {
        transform: "scale(0.8)",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
}));
