import React, { FC } from "react";
import styled from "styled-components";
import { SText } from "../../../components/Text/SText";

const PacksNotFound: FC<{ isPacksFetching: boolean }> = (props) => {
    return props.isPacksFetching ? (
        <></>
    ) : (
        <SPacksNotFound>
            <SText opacity={0.4} fontSize={"16px"} margin={"0 0 100px"}>
                Packs not found
            </SText>
        </SPacksNotFound>
    );
};

export default PacksNotFound;

const SPacksNotFound = styled.div`
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;
