import styled from "styled-components";
import {theme} from "../../styles/constants";


export type TSMessageProps = {
    isMine?: boolean,
}
export const SMessage = styled.div<TSMessageProps>(props => ({
    display: "flex",
    alignItems: "flex-end",
    gap: 10,
    columnGap: 10,
    rowGap: 10,
    fontSize: 14,
    color: "rgba(255,255,255,0.89)",
    wordBreak: "break-word",
    whiteSpace: "pre-line",
    ...props.isMine && {
        flexDirection: "row-reverse",
    }
}))

export const SMessageAvatar = styled.img((props) => ({
    borderRadius: "50%",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    width: 50,
    height: 50,
    objectFit: "cover",
}))


export type TSMessageContainerProps = {
    isMine?: boolean,
}
export const SMessageContainer = styled.div<TSMessageContainerProps>((props) => ({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    padding: "10px 10px",
    backgroundColor: theme.colors.message.default,
    borderRadius: "10px 10px 10px 10px",
    maxWidth: "90%",
    "&:after": {
        content: '""',
        position: "absolute",
        width: 30,
        height: 15,
        borderRight: `10px solid ${theme.colors.message.default}`,
        borderBottomRightRadius: "35%",
        left: -35,
        bottom: 10,
        transform: "scale(1.5) skewY(10deg) skewX(-20deg)",
        ...props.isMine && {
            borderRight: `10px solid ${theme.colors.message.mine}`,
            left: "initial",
            right: -35,
            transform: "scale(-1.5, 1.5) skewY(10deg) skewX(-20deg)",
        }
    },
    ...props.isMine && {
        backgroundColor: theme.colors.message.mine,
    }
}))

export const SMessageContent = styled.div((props) => ({
    display: "flex",
    flexWrap: "wrap",
    zIndex: 1,
}))

export const SMessageTitle = styled.span(() => ({
    fontWeight: "bold",
    zIndex: 1,
    color: "#8ab5e6",
    cursor: "pointer",
}))

export type TSMessageTextProps = {
    opacity?: number,
}
export const SMessageText = styled.span<TSMessageTextProps>(props => ({
    opacity: props.opacity,
    wordBreak: "break-word",

}))

export const SMessageTime = styled.div(() => ({
    opacity: 0.4,
    marginLeft: "auto",
    paddingLeft: 10,
    margin: "auto 0 -2px auto",
    fontSize: "12px"
}))