import styled from "styled-components";
import {Box} from "../../../components/Box/Box";

export const FilterWrapper = styled(Box)`
    align-items: center;
    justify-content: center;
    position: relative;
`;

const windowWidth = window.innerWidth

export const SFilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.71);
    top: ${windowWidth < 570 ? `calc(100% + 10px)` : 'calc(100% + 20px)'};
    left: ${windowWidth < 570 ? `calc(100% - 255px)` : ''};
    padding: 20px;
    border-radius: ${windowWidth < 570 ? `15px 0 15px 15px` : '15px'};
    backdrop-filter: blur(7.5px);
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
    width: 220px;
    z-index: ${(props) => props.theme.orders.dropdown};

    &:after {
        content: "";
        position: absolute;
        display: ${windowWidth < 570 ? `none` : ''};
        top: -10px;
        width: 0;
        height: 0;
        border-top: 20px solid rgba(255, 255, 255, 0.71);
        border-right: 20px solid transparent;
        transform: rotate(45deg);
    }
`;

export const SFilterReset = styled.div`
    margin-left: auto;
    margin-bottom: -10px;
`;
