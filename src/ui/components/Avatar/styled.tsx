import styled from "styled-components";

type TSizes = "sm" | "lg" | "md"
type TSAvatarProps = {
    size?: TSizes
    img?: string
}

const imgSizes = (size: TSizes) => {
    const sizePx = size === "sm" ? 40 : size === "lg" ? 100 : 60
    return {
        minWidth: sizePx,
        maxWidth: sizePx,
        maxHeight: sizePx,
        minHeight: sizePx
    }
}

export const SAvatar = styled.div<TSAvatarProps>((props) => ({
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: "rgba(0, 0 ,0 ,0.5)",
    backgroundImage: `url(${props.img})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    "img": {
        objectFit: "cover",
        objectPosition: "center",
        minWidth: "100%",
        minHeight: "100%",
    },
    ...imgSizes(props.size || 'md')
}))
