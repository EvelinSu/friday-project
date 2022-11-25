import styled, { css } from "styled-components";
import { SSuperOption, SSuperOptionsList } from "../Select/styled";

export const SPageCountDropdownWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    border-radius: 10px;
    width: 55px;
`;

export const SPageCountDropdownSelectedItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 5px 5px 10px;
    border-radius: inherit;
    gap: 5px;
    width: 100%;
    column-gap: 5px;
    cursor: pointer;
    font-size: 12px;
    color: ${(props) => props.theme.colors.textOnPrimary};
    background-color: ${(props) => props.theme.colors.primary};
    transition: 0.2s;

    svg {
        width: 18px;
        height: 18px;
        opacity: 0.5;

        path {
            fill: ${(props) => props.theme.colors.textOnPrimary};
        }
    }

    &:hover {
        opacity: 0.8;
    }
`;
export const SPageCountDropdown = styled(SSuperOptionsList)`
    text-align: center;
    flex-direction: column;
    position: absolute;
    bottom: calc(100% + 10px);
    width: 100%;
    top: initial;
    z-index: ${(props) => props.theme.orders.dropdown};
`;
export const SPageCountDropdownItem = styled(SSuperOption)<{ isActive: boolean }>`
    display: flex;
    height: max-content;
    padding: 5px;
    text-align: center;
    justify-content: center;
    border-radius: inherit;
    cursor: pointer;

    ${(props) =>
        props.isActive &&
        css`
            pointer-events: none;
            transform: scale(0.8);
            background-color: rgba(0, 0, 0, 0.05);
        `}
    &:hover {
        transform: scale(0.8);
        background-color: rgba(0, 0, 0, 0.05);
    }
`;
