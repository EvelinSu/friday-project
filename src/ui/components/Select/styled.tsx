import styled from "styled-components";

export const SSelect = styled.select(props => ({
    padding: "7px 15px",
    borderRadius: 15,
    border: "none",
    outline: "none",
    borderRight: `10px solid transparent`,
    color: "inherit",
    transition: "0.2s",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
    "&:hover": {
        opacity: 0.7,

    },
    option: {
        color: "#000",
    }
}))

export const SOption = styled.option(props => ({}))

export const SSuperSelectWrapper = styled.div(props => ({
    position: "relative",
    display: "flex",
    fontSize: 14,
    outline: "none",
    border: "none",
}))

export const SSuperSelectInputWrapper = styled.div(props => ({
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0,0.1)",
    padding: "8px 12px",
    cursor: "pointer",
    width: "100%",
    transition: "0.2s",
    "&:hover": {
        opacity: 0.7
    }

}))

export const SSuperSelectInput = styled.div(props => ({
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    userSelect: "none",

}))

type TInputProps = {
    isOpen?: boolean
    isHovered?: boolean
}
export const SSuperSelectInputIcon = styled.div<TInputProps>(props => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.2s",
    transform: `rotate(${props.isOpen ? '180deg' : '0'})`,
    svg: {
        width: 18,
        height: 18,
    }
}))

export const SSuperOptionsList = styled.div(({theme, ...props}) => ({
    justifySelf: "center",
    position: "absolute",
    top: 40,
    maxWidth: "100%",
    width: "100%",
    borderRadius: 10,
    backgroundColor: theme.colors.secondary,
    maxHeight: 160,
    overflow: "auto",
}))

export const SSuperOption = styled.div<TInputProps>(props => ({
    padding: "5px 20px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
    "&::last-of-type": {
        borderBottom: "none",
    },
    ...props.isHovered && {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    }

}))
