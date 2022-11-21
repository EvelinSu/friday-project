import styled from "styled-components";
import {Box} from "../../../components/Box/Box";

export const FilterWrapper = styled(Box)`
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
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
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
