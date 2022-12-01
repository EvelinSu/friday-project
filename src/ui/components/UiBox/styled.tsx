import styled from "styled-components";
import { SText } from "../Text/SText";
import { Property } from "csstype";

type TSUiBoxContainerProps = {
    maxWidth?: string;
    width?: string;
    height?: string;
    margin?: string;
    overflow?: Property.Overflow;
};
export const SUiBoxContainer = styled.div<TSUiBoxContainerProps>`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: ${(props) => props.margin || "auto"};
    border-radius: 20px;
    padding: 35px 25px;
    gap: 20px;
    row-gap: 20px;
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);
    width: ${(props) => props.width || "100%"};
    max-width: ${(props) => props.maxWidth || "380px"};
    position: relative;
    overflow: ${(props) => props.overflow};
    color: ${(props) => props.theme.colors.textOnSecondary};
`;

export const SUiBoxHeader = styled(SText)`
    font-size: 26px;
    word-break: break-word;
    font-weight: 600;
    text-align: center;
    color: ${({ theme }) => theme.colors.button.success};
`;

export const SUiBoxBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: inherit;
`;

export const SUiBoxFooter = styled.div`
    //
`;
