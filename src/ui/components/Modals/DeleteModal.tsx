import { SMegaShadow } from "../MegaShadow/styled";
import { UiBox } from "../UiBox/UiBox";
import { FC } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { Box } from "../Box/Box";
import { SText } from "../Text/SText";
import Button from "../Button/Button";

type TDeleteModalProps = {
    onClose: () => void;
    deleteHandler: () => void;
    text: string;
    title: string;
};
const DeleteModal: FC<TDeleteModalProps> = (props) => {
    return (
        <SMegaShadow onClick={() => props.onClose()}>
            <UiBox
                title={props.title}
                body={
                    <DeleteModalBody
                        text={props.text}
                        title={props.title}
                        deleteHandler={props.deleteHandler}
                        onClose={props.onClose}
                    />
                }
            />
        </SMegaShadow>
    );
};

const DeleteModalBody: FC<TDeleteModalProps> = (props) => {
    const isPacksButtonsDisabled = useAppSelector((state) => state.packs.isButtonsDisabled);
    const isCardsButtonsDisabled = useAppSelector((state) => state.cards.isButtonsDisabled);

    const deleteHandler = () => {
        props.deleteHandler();
    };

    return (
        <Box flexDirection={"column"} justifyContent="center">
            <SText textAlign={"center"} opacity={0.6} lineHeight={"24px"}>
                {props.text}
            </SText>
            <Box justifyContent="center">
                <Button
                    label={"Delete"}
                    onClick={deleteHandler}
                    size="lg"
                    isLoading={isPacksButtonsDisabled || isCardsButtonsDisabled}
                />
                <Button
                    label={"Cancel"}
                    severity={"neutral"}
                    size="lg"
                    onClick={props.onClose}
                    isLoading={isPacksButtonsDisabled || isCardsButtonsDisabled}
                />
            </Box>
        </Box>
    );
};

export default DeleteModal;
