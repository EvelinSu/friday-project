import React, { FC, useMemo } from "react";
import DeleteModal from "../../../components/Modals/DeleteModal";
import AddAndUpdatePackModal, { TAddAndUpdatePackModalValues } from "./AddAndUpdatePackModal";
import { TPackModals } from "../PacksList";
import { deletePack, updatePack } from "../../../../bll/packsReducer";
import { useAppDispatch } from "../../../../hooks/hooks";
import { getUrlParams } from "../../../../common/utils/getUrlParams";
import { useSearchParams } from "react-router-dom";
import { TPack } from "../../../../dal/ResponseTypes";

type TPackModalsProps = {
    modalType: TPackModals;
    currentId: string;
    setIsPackModalOpen: (isPackModalOpen: TPackModals) => void;
    currentPack?: TPack;
};
export const PackModals: FC<TPackModalsProps> = ({
    modalType,
    currentId,
    setIsPackModalOpen,
    currentPack,
}) => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const updatePackHandler = (values: TAddAndUpdatePackModalValues) => {
        dispatch(updatePack({ _id: currentId, values, paramURL: URLParams })).then(() =>
            setIsPackModalOpen(false)
        );
    };
    const deleteHandler = () => {
        dispatch(deletePack({ id: currentId, paramURL: URLParams })).then(() =>
            setIsPackModalOpen(false)
        );
    };

    if (modalType === "delete") {
        return (
            <DeleteModal
                deleteHandler={deleteHandler}
                onClose={() => setIsPackModalOpen(false)}
                text={"Do you really want to remove this pack? All cards will be deleted."}
                title={"Delete pack"}
            />
        );
    }
    if (modalType === "update") {
        return (
            <AddAndUpdatePackModal
                title={"Update pack"}
                onSubmitHandler={updatePackHandler}
                onClose={() => setIsPackModalOpen(false)}
                currentPack={currentPack}
            />
        );
    }

    return <></>;
};
