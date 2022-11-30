import styled, { css } from "styled-components";

export const SCardWrapper = styled.div<{ isFetching: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 7px;
    row-gap: 7px;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) =>
        `linear-gradient(112deg, ${theme.colors.cards.default[0]}0%, ${theme.colors.cards.default[1]} 100%)`};
    padding: 15px;
    min-height: 145px;
    border-radius: 15px;
    position: relative;
    color: #fff;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
    ${(props) =>
        props.isFetching &&
        css`
            opacity: 0.6;
            pointer-events: none;
        `}
`;
export const SCardShadow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    padding: 15px;
    background-color: rgba(0, 0, 0, 0.3);
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    position: absolute;
    opacity: 0;
    border-radius: inherit;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    z-index: 1;
    transition: 0.2s;

    &:hover {
        opacity: 1;
    }
`;
export const SCardIcons = styled.div`
    display: flex;
    gap: 10px;
    column-gap: 10px;
    position: absolute;
    bottom: 10px;
    right: 10px;
`;

export const SCardText = styled.div<{ lineClamp?: number }>`
    display: -webkit-box;
    -webkit-line-clamp: ${(props) => props.lineClamp || 3};
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
`;

export const SCardImage = styled.img`
    object-fit: cover;
    object-position: center;
    max-width: 100%;
    max-height: calc(100% - 60px);
    border-radius: inherit;
`;
