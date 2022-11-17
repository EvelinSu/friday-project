import styled from "styled-components";

export const SSearchInput = styled.div`
    width: 100%;
    max-width: 350px;

    input {
        background-color: ${({ theme }) => theme.colors.secondaryLight};
        border: 1px solid rgba(0, 0, 0, 0.1);

        &:hover {
            opacity: 1;
            border: 1px solid rgba(0, 0, 0, 0.2);
        }

        &:focus {
            border: 1px solid ${({ theme }) => theme.colors.primary};
        }
    }
`;
