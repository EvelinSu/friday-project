import styled from "styled-components";
import { SText } from "../components/Text/SText";

export const SPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1230px;
    gap: 20px;
    width: 100%;
    padding: 20px 20px 0 20px;
    overflow: hidden;
    flex-grow: 1;
    position: relative;
`;

export const SPagePanel = styled.div`
    display: flex;
    gap: 20px;
    row-gap: 20px;
    flex-direction: column;
`;

export const SMainTitle = styled(SText)((props) => ({
    fontSize: 22,
    fontWeight: 600,
    color: props.theme.colors.textOnSecondary,
}));
