import styled, {css} from "styled-components";

export const SPackCardWrapper = styled.div<{ isFetching: boolean }>`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 15px;
    background-color: ${({theme}) => theme.colors.primary};
    border-radius: 15px;
    color: ${({theme}) => theme.colors.cards.text};
    font-size: 12px;
    min-height: 145px;
    transition: 0.2s;
    cursor: pointer;

    ${props => props.isFetching && css`
        pointer-events: none;
        opacity: 0.6;
    `}
    &:hover {
        transform: scale(0.95);
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
