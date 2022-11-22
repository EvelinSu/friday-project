import styled, {css} from "styled-components";

type TSStarsWrapper = {
    isEditable: boolean
}
export const SStarsWrapper = styled.div<TSStarsWrapper>`
    display: flex;
    align-items: center;
    justify-content: center;
    ${({isEditable}) => css`
        pointer-events: none;
    `}
`
export const SStar = styled.div`
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }

    &:active {

    }
`