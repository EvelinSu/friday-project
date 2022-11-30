import styled, { css } from "styled-components";
import { Property } from "csstype";

interface TSTextProps {
    isEllipsis?: boolean;
    opacity?: string | number;
    fontWeight?: Property.FontWeight;
    fontSize?: Property.FontSize;
    margin?: string;
    isLink?: boolean;
    textAlign?: Property.TextAlign;
    lineHeight?: Property.LineHeight;
    lineClamp?: Property.LineClamp;
    maxWidth?: Property.MaxWidth;
    whiteSpace?: Property.WhiteSpace;
}

export const SText = styled.span<TSTextProps>(
    (props) => css`
        opacity: ${props.opacity};
        font-weight: ${props.fontWeight};
        margin: ${props.margin};
        max-width: ${props.maxWidth};
        font-size: ${props.fontSize};
        line-height: ${props.lineHeight};
        text-align: ${props.textAlign};
        white-space: ${props.whiteSpace};
        ${props.lineClamp &&
        css`
            display: -webkit-box;
            -webkit-line-clamp: ${props.lineClamp};
            line-clamp: ${props.lineClamp};
            -webkit-box-orient: vertical;
            overflow: hidden;
        `}
        ${props.isEllipsis &&
        css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        `}
    ${props.isLink &&
        css`
            text-decoration: underline;
            color: ${props.theme.colors.button.success};
            cursor: pointer;

            &:hover {
                text-decoration: none;
            }
        `}
    `
);
