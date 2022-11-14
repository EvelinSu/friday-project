import styled from "styled-components";
import { Property } from "csstype";

export type TSTextarea = {
    height?: Property.Height;
};
export const STextarea = styled.textarea<TSTextarea>`
    height: ${(props) => props.height || "150px"};
    border-radius: ${({ theme }) => theme.blockSettings.borderRadius};
    background-color: rgba(255, 255, 255, 0.05);
    padding: 10px 15px;
    width: 100%;
    border: 1px solid transparent;
    ::placeholder {
        color: ${({ theme }) => theme.colors.textOnPrimary};
        opacity: 0.3;
    }
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    &:focus {
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
`;
