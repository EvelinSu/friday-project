import React, { FC } from "react";
import styled from "styled-components";
import { SText } from "../../../components/Text/SText";

export const UsersNotFound: FC<{ isUsersFetching: boolean }> = (props) => {
    return props.isUsersFetching ? (
        <></>
    ) : (
        <SPacksNotFound>
            <SText opacity={0.4} fontSize={"16px"} margin={"0 0 100px"}>
                Users not found
            </SText>
        </SPacksNotFound>
    );
};

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
