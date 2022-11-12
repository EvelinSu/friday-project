import styled from "styled-components";

export const SProfileContent = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;
    flex-direction: row;
    @media all and (max-width: 470px) {
        flex-direction: column;
    }
`