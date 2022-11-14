import styled from "styled-components";

type TSModalWrapperProps = {
    shadow?: boolean;
};
export const SMegaShadow = styled.div<TSModalWrapperProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    padding: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

type TSModalContainerProps = {
    width?: string;
};
export const SModalContainer = styled.div<TSModalContainerProps>`
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
`;

export const SModalHeader = styled.div`
    padding-bottom: 20px;
    font-size: 26px;
    font-weight: 600;
    text-align: center;
    color: ${({ theme }) => theme.colors.primaryDark};
`;

export const SModalBody = styled.div`
    width: 100%;
`;

export const SModalFooter = styled.div`
    //
`;
