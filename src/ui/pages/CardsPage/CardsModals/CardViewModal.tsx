import React, { FC } from "react";
import { TCard } from "../../../../dal/ResponseTypes";
import { SMegaShadow } from "../../../components/MegaShadow/styled";
import { UiBox } from "../../../components/UiBox/UiBox";

type TCardViewModal = {
    title: string;
    onClose: () => void;
    currentCard?: TCard;
};
export const CardViewModal: FC<TCardViewModal> = (props) => {
    return (
        <SMegaShadow>
            <UiBox title={""}>
                <></>
            </UiBox>
        </SMegaShadow>
    );
};

