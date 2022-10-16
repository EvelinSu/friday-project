import styled from "styled-components";
import {theme} from "../../styles/constants";
import {DefaultInputPropsType} from "./Input";

export const SForm = styled.form((props) => ({
    display: "flex",
    flexDirection: "column",
    gap: 25,
    justifyContent: "inherit",
}))

type TSInputWrapperProps = {
    error?: string
}

export const SInputWrapper = styled.div<TSInputWrapperProps>((props) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    position: "relative",
    ...props.error && {
        "&:after": {
            content: `'${props.error}'`,
            position: "absolute",
            left: "calc(100% + 10px)",
            backgroundColor: theme.colors.status.error,
            padding: "3px 10px",
            fontSize: 12,
            zIndex: theme.orders.inputErrors,
            borderRadius: 5,
            opacity: 0,
            transition: "0.2s",
        },
        "&:before": {
            content: `'${props.error}'`,
            position: "absolute",
            left: "calc(100% + 10px)",
            backgroundColor: theme.colors.status.error,
            padding: "3px 10px",
            fontSize: 12,
            zIndex: theme.orders.inputErrors,
            borderRadius: 5,
            opacity: 0,
            transition: "0.2s",
        },
        "&:hover": {
            "&:before": {
                opacity: 1,
            },
            "&:after": {
                opacity: 1
            }
        },

    }

}))

type TSInputProps = {
    isError?: boolean
}

export const SInput = styled.input<DefaultInputPropsType & TSInputProps>(({...props}) => ({
    padding: "8px 15px",
    borderRadius: theme.blockSettings.borderRadius,
    backgroundColor: theme.colors.input.default,
    outline: `1px solid transparent`,
    width: "100%",
    "&:hover": {
        opacity: 0.8
    },
    "&:focus": {
        outline: `1px solid ${theme.colors.primaryLightest}`,
        opacity: 1,
    },
    ...props.isError && {
        outline: `1px solid ${theme.colors.status.error}`,
        "&:focus": {
            outline: `1px solid ${theme.colors.status.error}`,
        },
    }
}))
