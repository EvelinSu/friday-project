import styled from "styled-components";
import {theme} from "../../styles/constants";

type TSIconLinkProps = {
    isDisabled: boolean
}

export const SIconLink = styled.a<TSIconLinkProps>((props) => ({
    display: "flex",
    cursor: "pointer",
    borderRadius: "50%",
    backgroundColor: theme.colors.primaryLight,
    transition: "0.2s",
    ...props.isDisabled && {
        pointerEvents: "none",
        opacity: 0.4,
    },
    "&:hover": {
        transform: "scale(1.2)",
    }
}))