import styled from "styled-components";

export const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;
export const SFilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.71);
    right: calc(100% + 20px);
    padding: 20px;
    border-radius: 15px;
    backdrop-filter: blur(7.5px);
    width: 220px;
    z-index: ${(props) => props.theme.orders.dropdown};

    &:after {
        content: "";
        position: absolute;
        right: -10px;
        width: 0;
        height: 0;
        backdrop-filter: inherit;
        border-top: 20px solid rgba(255, 255, 255, 0.71);
        border-right: 20px solid transparent;
        transform: rotate(135deg);
    }
`;

export const SFilterReset = styled.div`
    margin-left: auto;
    margin-bottom: -10px;
`;
