import styled from "styled-components";

export const SSearchInput = styled.div`
    width: 100%;
    max-width: 350px;

    input {
        background-color: ${({ theme }) => theme.colors.secondaryLight};
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
`;
