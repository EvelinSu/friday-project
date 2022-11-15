import styled, { css } from "styled-components";

export const SSuperSelectWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    font-size: 14px;
    outline: none;
    border: none;
`;

export const SSuperSelectInputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 5px;
    position: relative;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.textOnPrimary};
    padding: 8px 12px;
    cursor: pointer;
    width: 100%;
    transition: 0.2s;

    &:hover {
        opacity: 0.7;
    }
`;

export const SSuperSelectInput = styled.div`
    display: flex;
    align-items: center;
    padding: 0 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
`;

type TInputProps = {
    isOpen?: boolean;
    isHovered?: boolean;
};
export const SSuperSelectInputIcon = styled.div<TInputProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    transition: 0.1s;
    transform: rotate(${(props) => (props.isOpen ? "180deg" : "0")});

    svg {
        width: 18px;
        height: 18px;

        path {
            fill: rgba(255, 255, 255, 0.7);
        }
    }
`;

export const SSuperOptionsList = styled.div`
    justify-self: center;
    position: absolute;
    top: 40px;
    max-width: 100%;
    width: calc(100% - 20px);
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.secondaryLight};
    max-height: 160px;
    padding: 5px 0;
    overflow: auto;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
    z-index: ${({ theme }) => theme.orders.dropdown};
`;

export const SSuperOption = styled.div<TInputProps>`
    padding: 5px 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 10px;
    transition: 0.2s;
    cursor: pointer;

    &:last-of-type {
        border-bottom: none;
    }

    ${(props) =>
        props.isHovered &&
        css`
            transform: scale(0.9);
            background-color: ${props.theme.colors.input.default};
            padding: 5px 10px;
        `},
`;
