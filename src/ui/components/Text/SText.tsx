import styled, {css} from "styled-components";
import {Property} from "csstype";

interface TSTextProps {
    isEllipsis?: boolean,
    opacity?: string,
    fontWeight?: Property.FontWeight,
    fontSize?: Property.FontSize,
    margin?: string
}
export const SText = styled.span<TSTextProps>`
    opacity: ${props => props.opacity};
    font-weight: ${props => props.fontWeight};
    margin: ${props => props.margin};
    font-size: ${props => props.fontSize};
    ${props => props.isEllipsis && css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `}
`