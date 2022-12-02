import React, { FC } from "react";
import styled from "styled-components";
import { SText } from "../../../components/Text/SText";

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

const SCardsNotFound = styled.div((props) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
}));
