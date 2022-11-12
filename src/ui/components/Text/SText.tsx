import styled, {css} from "styled-components";
import {Property} from "csstype";

interface TSTextProps {
    isEllipsis?: boolean,
    opacity?: string | number,
    fontWeight?: Property.FontWeight,
    fontSize?: Property.FontSize,
    margin?: string
    isLink?: boolean
    textAlign?: Property.TextAlign
}

export const SText = styled.span<TSTextProps>`
    opacity: ${props => props.opacity};
    font-weight: ${props => props.fontWeight};
    margin: ${props => props.margin};
    font-size: ${props => props.fontSize};
    text-align: ${props => props.textAlign};
    ${props => props.isEllipsis && css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `}
    ${({isLink, theme}) => isLink && css`
        text-decoration: underline;
        color: ${theme.colors.primary};
        cursor: pointer;
        &:hover {
            text-decoration: none;
        }
    `}
`