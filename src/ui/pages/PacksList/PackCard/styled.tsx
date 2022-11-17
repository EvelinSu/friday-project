import styled from "styled-components";

export const SPackCardWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 15px 15px 5px;
    background-color: ${({ theme }) => theme.colors.primary};
    // background: ${({ theme }) =>
        `linear-gradient(110deg, ${theme.colors.cards.default[0]}, ${theme.colors.cards.default[1]})`};
    border-radius: 15px;
    color: ${({ theme }) => theme.colors.cards.text};
    font-size: 12px;
    min-height: 125px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

export const SPackCardActions = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    gap: 5px;
    padding: 0 0 10px 0;
    flex-direction: column;
    max-height: 120px;
`;
