import React, { useMemo, useState } from "react";
import PackCard from "./PackCard/PackCard";
import { GridBox } from "../../components/GridBox/GridBox";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";
import AddAndUpdatePackModal, {
    TAddAndUpdatePackModalValues,
} from "./AddAndUpdatePackModal/AddAndUpdatePackModal";
import { deletePack, updatePack } from "../../../bll/packsReducer";
import { getActualPacksParams } from "../../../common/utils/getActualParams";
import { SMegaShadow } from "../../components/Modal/styled";
import { Modal } from "../../components/Modal/Modal";
import { Box } from "../../components/Box/Box";
import Button from "../../components/Button/Button";

const PacksList = () => {
    const [searchParams] = useSearchParams();
    const { cardPacks } = useAppSelector((state) => state.packs.cardPacksData);
    const { isModalButtonsDisabled } = useAppSelector((state) => state.packs);

    const pageCount = searchParams.get("pageCount");
    const [isUpdatePackModelOpen, setIsUpdatePackModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const URLParams = useMemo(() => getActualPacksParams(searchParams), [searchParams]);
    const [currentId, setCurrentId] = useState<string>("");
    const dispatch = useAppDispatch();

    const windowWidth = window.innerWidth;
    const rowsCount = pageCount && +pageCount > 8 ? +pageCount / 4 : 3;

    const updateModalHandler = (id: string) => {
        setIsUpdatePackModalOpen(true);
        setCurrentId(id);
    };

    const deletePackHandler = () => {
        dispatch(deletePack(currentId, URLParams)).then(() => {
            setIsDeleteModalOpen(false);
        });
    };

    const deleteModalHandler = (id: string) => {
        setIsDeleteModalOpen(true);
        setCurrentId(id);
    };

    const updatePackHandler = (values: TAddAndUpdatePackModalValues) => {
        dispatch(updatePack({ _id: currentId, values, paramURL: URLParams })).then(() => {
            setIsUpdatePackModalOpen(false);
        });
    };

    return (
        <GridBox
            padding={"20px 0 0 0"}
            columns={"repeat(auto-fill, minmax(220px, 1fr))"}
            rows={windowWidth > 540 ? `repeat(${rowsCount}, minmax(125px, 200px))` : ``}
        >
            {cardPacks.map((pack) => (
                <PackCard
                    key={pack._id}
                    pack={pack}
                    setUpdateModal={updateModalHandler}
                    setDeleteModal={deleteModalHandler}
                />
            ))}
            {isDeleteModalOpen && (
                <SMegaShadow onClick={() => setIsDeleteModalOpen(false)}>
                    <Modal
                        title={"Delete pack"}
                        body={
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
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    isLoading={isModalButtonsDisabled}
                                />
                            </Box>
                        }
                    />
                </SMegaShadow>
            )}

            {isUpdatePackModelOpen && (
                <AddAndUpdatePackModal
                    title={"Update pack"}
                    kakHochesh={(values) => updatePackHandler(values)}
                    onClose={() => setIsUpdatePackModalOpen(false)}
                />
            )}
        </GridBox>
    );
};

export default PacksList;
