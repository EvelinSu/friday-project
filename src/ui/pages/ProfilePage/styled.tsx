import styled from "styled-components";

export const SProfileContent = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    align-items: center;
    flex-direction: row;
    position: relative;
    @media all and (max-width: 470px) {
        flex-direction: column;
    }
`;

export const SProfileButton = styled.div`
    display: flex;
    justify-content: center;
`;
