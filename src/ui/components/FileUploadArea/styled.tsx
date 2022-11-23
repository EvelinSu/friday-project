import styled from "styled-components";

export const SFileUploadArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 100px;
    background-color: ${({theme}) => theme.colors.input.default};
    border-radius: 15px;
    border: 2px dashed rgba(0, 0, 0, 0.1);
    cursor: pointer;
    position: relative;

    &:hover {
        opacity: 0.7;
    }

`
export const SFileUploadAreaImage = styled.div<{ img: string }>`
    position: absolute;
    width: 100%;
    border-radius: inherit;
    opacity: 0.3;
    height: 100%;
    background: url(${props => props.img}) center;
    background-size: cover;
    background-repeat: no-repeat;
`