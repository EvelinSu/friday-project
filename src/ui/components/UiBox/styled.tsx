import styled from "styled-components";

type TSUiBoxContainerProps = {
    width?: string;
};
export const SUiBoxContainer = styled.div<TSUiBoxContainerProps>`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: auto 0;
    border-radius: 20px;
    padding: 35px 25px;
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);
    max-width: ${(props) => props.width || "360px"};
    width: 100%;
    position: relative;
`;

export const SUiBoxHeader = styled.div`
    padding-bottom: 20px;
    font-size: 26px;
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
