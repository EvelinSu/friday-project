import styled from "styled-components";

export const SMegaShadow = styled.div`
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
    z-index: ${({theme}) => theme.orders.modal};
`;
