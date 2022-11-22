import styled from "styled-components";
import {SText} from "../components/Text/SText";

export const SPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1230px;
    width: 100%;
    padding: 20px 20px 0 20px;
    overflow: hidden;
    flex-grow: 1;
    position: relative;
`;

export const SPagePanel = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SPageContent = styled.div`
    background-color: black;
`;

export const SMainTitle = styled(SText)`
    font-size: 22px;
    font-weight: 600;
`;
