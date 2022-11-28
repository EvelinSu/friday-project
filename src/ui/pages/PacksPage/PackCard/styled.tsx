import styled, { css } from "styled-components";

export const SPackCardWrapper = styled.div<{ isFetching: boolean; img: string }>`
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 15px;
    color: ${({ theme }) => theme.colors.cards.text};
    font-size: 12px;
    min-height: 145px;
    transition: 0.2s;
    cursor: pointer;

    ${(props) =>
        props.isFetching &&
        css`
            pointer-events: none;
        `}
    &:hover {
        transform: scale(0.95);
    }

    ${(props) =>
        props.img &&
        css`
            text-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
            background: url(${props.img}) center;
            background-size: cover;
            background-repeat: no-repeat;
        `}
`;

export const SPackCardShadow = styled.div<{ img: string }>`
    display: flex;
    height: 100%;
    width: 100%;
    padding: 15px;
    gap: 10px;
    justify-content: space-between;
    border-radius: inherit;
    ${(props) =>
        props.img &&
        css`
            background-color: ${props.theme.colors.cards.shadow};
        `}
`;

export const SPackCardUser = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
        text-decoration: underline;
    }
`;

export const SPackCardActions = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    gap: 5px;
    flex-direction: column;
    max-height: 120px;
`;

export const SPackCardPrivateIcon = styled.div`
    display: flex;
    align-items: center;
    opacity: 0.5;
    width: 18px;
    height: 18px;
`;
