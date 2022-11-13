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
    lineHeight?: Property.LineHeight
    lineClamp?: number
    maxWidth?: Property.MaxWidth
}

export const SText = styled.span<TSTextProps>`
    opacity: ${props => props.opacity};
    font-weight: ${props => props.fontWeight};
    margin: ${props => props.margin};
    max-width: ${props => props.maxWidth};
    font-size: ${props => props.fontSize};
    line-height: ${props => props.lineHeight};
    text-align: ${props => props.textAlign};
    ${props => props.lineClamp && css`
        display: -webkit-box;
        -webkit-line-clamp: ${props.lineClamp};
        -webkit-box-orient: vertical;
        overflow: hidden;
    `}
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