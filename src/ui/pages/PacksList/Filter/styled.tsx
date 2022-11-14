import styled from "styled-components";

export const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`
export const SFilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.71);
    right: calc(100% + 10px);
    padding: 20px;
    border-radius: 15px;
    backdrop-filter: blur(7.5px);
    width: 220px;
`