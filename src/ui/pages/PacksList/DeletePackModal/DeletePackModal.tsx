import React, { FC, useMemo } from "react";
import { Modal } from "../../../components/Modal/Modal";
import { Box } from "../../../components/Box/Box";
import { SText } from "../../../components/Text/SText";
import Button from "../../../components/Button/Button";
import { SMegaShadow } from "../../../components/Modal/styled";
import { deletePack } from "../../../../bll/packsReducer";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { getActualPacksParams } from "../../../../common/utils/getActualParams";
import { useSearchParams } from "react-router-dom";

type TDeletePackModalProps = {
    onClose: () => void;
    packId: string;
};
const DeletePackModal: FC<TDeletePackModalProps> = (props) => {
    return (
        <SMegaShadow onClick={() => props.onClose()}>
            <Modal
                title={"Delete pack"}
                body={<DeletePackModalBody packId={props.packId} onClose={props.onClose} />}
            />
        </SMegaShadow>
    );
};

const DeletePackModalBody: FC<TDeletePackModalProps> = (props) => {
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getActualPacksParams(searchParams), [searchParams]);
    const dispatch = useAppDispatch();

    const { isModalButtonsDisabled } = useAppSelector((state) => state.packs);

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
                    isLoading={isModalButtonsDisabled}
                />
                <Button
                    label={"Cansel"}
                    severity={"neutral"}
                    size="lg"
                    onClick={props.onClose}
                    isLoading={isModalButtonsDisabled}
                />
            </Box>
        </Box>
    );
};

export default DeletePackModal;
