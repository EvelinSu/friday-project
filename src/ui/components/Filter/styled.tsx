import styled from "styled-components";
import {Box} from "../Box/Box";

type TSFilterWrapperProps = {
    isActive?: boolean;
    isDisabled?: boolean;
};
export const SFilterWrapper = styled(Box)<TSFilterWrapperProps>((props) => ({
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    ".icon-button": {
        minHeight: 39,
        minWidth: 39,
        borderRadius: 15,
        position: "relative",
        ...(props.isActive && {
            "&:after": {
                content: `""`,
                width: 8,
                height: 8,
                backgroundColor: props.theme.colors.severity.notification,
                position: "absolute",
                top: 0,
                right: 0,
                borderRadius: 50,
            },
        }),
    },
}));

const windowWidth = window.innerWidth;

export const SFilterContainer = styled.div((props) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    position: "absolute",
    backgroundColor: props.theme.colors.secondaryLightAlpha07,
    top: windowWidth < 570 ? "calc(100% + 10px)" : "calc(100% + 20px)",
    left: windowWidth < 570 ? "calc(100% - 255px)" : "",
    padding: 20,
    borderRadius: windowWidth < 570 ? "15px 0 15px 15px" : "15px",
    backdropFilter: "blur(7.5px)",
    boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.1)",
    width: 220,
    zIndex: props.theme.orders.dropdown,
    "&:after": {
        content: '""',
        position: "absolute",
        display: windowWidth < 570 ? "none" : "",
        top: -10,
        width: 0,
        height: 0,
        borderTop: `20px solid ${props.theme.colors.secondaryLightAlpha07}`,
        borderRight: "20px solid transparent",
        boxShadow: "-1px -1px 1px 0 rgba(0, 0, 0, 0.05)",
        transform: "rotate(45deg)",
    },
}));

export const SFilterReset = styled.div({
    marginLeft: "auto",
    marginBottom: -10,
    marginTop: -20,
});
