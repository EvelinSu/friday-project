import styled from "styled-components";
import { SText } from "../Text/SText";

type TSUiBoxContainerProps = {
    width?: string;
    height?: string;
};
export const SUiBoxContainer = styled.div<TSUiBoxContainerProps>`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: ${(props) => (props.height ? "" : "auto 0")};
    border-radius: 20px;
    padding: 35px 25px;
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);
    max-width: ${(props) => props.width || "360px"};
    width: 100%;
    position: relative;
    overflow: auto;
`;

export const SUiBoxHeader = styled(SText)`
    margin-bottom: 20px;
    font-size: 26px;
    word-break: break-word;
    font-weight: 600;
    text-align: center;
    color: ${({ theme }) => theme.colors.primaryDark};
`;

export const SUiBoxBody = styled.div`
    width: 100%;
`;

export const SUiBoxFooter = styled.div`
    //
`;
