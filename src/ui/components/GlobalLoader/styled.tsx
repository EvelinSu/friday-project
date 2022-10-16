import styled from "styled-components";
import {theme} from "../../styles/constants";

type TSGlobalLoaderProps = {

}

export const SGlobalLoader = styled.div<TSGlobalLoaderProps>(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    zIndex: 100,
}))