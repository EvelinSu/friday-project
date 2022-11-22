import React, {FC} from "react";
import styled from "styled-components";
import {SText} from "../../../components/Text/SText";

export const CardsNotFound: FC<{ isCardsFetching: boolean }> = (props) => {

    return props.isCardsFetching ? (
        <></>
    ) : (
        <SCardsNotFound>
            <SText opacity={0.4} fontSize={"16px"} textAlign={"center"}>
                Cards not found
            </SText>
        </SCardsNotFound>
    );
};

const SCardsNotFound = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
`;
