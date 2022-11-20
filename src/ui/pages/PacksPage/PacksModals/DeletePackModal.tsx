import React, { FC, useMemo } from "react";
import { Box } from "../../../components/Box/Box";
import { SText } from "../../../components/Text/SText";
import Button from "../../../components/Button/Button";
import { deletePack } from "../../../../bll/packsReducer";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { getUrlPacksParams } from "../../../../common/utils/getActualParams";
import { useSearchParams } from "react-router-dom";
import { SMegaShadow } from "../../../components/MegaShadow/styled";
import { UiBox } from "../../../components/UiBox/UiBox";

type TDeletePackModalProps = {
    onClose: () => void;
    packId: string;
};
const DeletePackModal: FC<TDeletePackModalProps> = (props) => {
    return (
        <SMegaShadow onClick={() => props.onClose()}>
            <UiBox
                title={"Delete pack"}
                body={<DeletePackModalBody packId={props.packId} onClose={props.onClose} />}
            />
        </SMegaShadow>
    );
};

const DeletePackModalBody: FC<TDeletePackModalProps> = (props) => {
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlPacksParams(searchParams), [searchParams]);
    const dispatch = useAppDispatch();

    const { isButtonsDisabled } = useAppSelector((state) => state.packs);

    const deletePackHandler = () => {
        dispatch(deletePack(props.packId, URLParams)).then(() => {
            props.onClose();
        });
    };

    return (
        <Box flexDirection={"column"} justifyContent="center">
            <SText textAlign={"center"} opacity={0.6} lineHeight={"24px"}>
                Do you really want to remove this pack? All cards will be deleted.
            </SText>
            <Box justifyContent="center">
                <Button
                    label={"Delete"}
                    onClick={deletePackHandler}
                    size="lg"
                    isLoading={isButtonsDisabled}
                />
                <Button
                    label={"Cansel"}
                    severity={"neutral"}
                    size="lg"
                    onClick={props.onClose}
                    isLoading={isButtonsDisabled}
                />
            </Box>
        </Box>
    );
};

export default DeletePackModal;