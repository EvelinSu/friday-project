import React, { useCallback, useMemo, useState } from "react";
import PackCard from "./PackCard/PackCard";
import { GridBox } from "../../components/GridBox/GridBox";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";
import { getUrlPacksParams } from "../../../common/utils/getActualParams";
import { updatePack } from "../../../bll/packsReducer";
import AddAndUpdatePackModal, {
    TAddAndUpdatePackModalValues,
} from "./PacksModals/AddAndUpdatePackModal";
import DeletePackModal from "./PacksModals/DeletePackModal";

export type TPackModals = "delete" | "update" | false;

const PacksList = () => {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlPacksParams(searchParams), [searchParams]);
    const { isFetching } = useAppSelector((state) => state.app);
    const { cardPacks } = useAppSelector((state) => state.packs.cardPacksData);
    const [isPackModalOpen, setIsPackModalOpen] = useState<TPackModals>(false);
    const [currentId, setCurrentId] = useState<string>("");

    const windowWidth = window.innerWidth;
    const rowsCount = URLParams.pageCount && +URLParams.pageCount > 8 ? +URLParams.pageCount / 5 : 4;

    const onIconClickHandler = useCallback(
        (e: React.MouseEvent<HTMLDivElement>, id: string, modalType: TPackModals) => {
            e.stopPropagation();
            setIsPackModalOpen(modalType);
            setCurrentId(id);
        },
        []
    );

    const updatePackHandler = (values: TAddAndUpdatePackModalValues) => {
        dispatch(updatePack({ _id: currentId, values, paramURL: URLParams })).then(() => {
            setIsPackModalOpen(false);
        });
    };

    return (
        <GridBox
            padding={"20px 0 0 0"}
            columns={"repeat(auto-fill, minmax(220px, 1fr))"}
            style={{ flexGrow: windowWidth > 540 ? 1 : "" }}
            rows={windowWidth > 540 ? `repeat(${rowsCount}, minmax(125px, 200px))` : ``}
        >
            {cardPacks.map((pack) => (
                <PackCard
                    key={pack._id}
                    pack={pack}
                    onIconClickHandler={onIconClickHandler}
                    isFetching={isFetching}
                />
            ))}
            {isPackModalOpen === "delete" && (
                <DeletePackModal onClose={() => setIsPackModalOpen(false)} packId={currentId} />
            )}
            {isPackModalOpen === "update" && (
                <AddAndUpdatePackModal
                    title={"Update pack"}
                    onSubmitHandler={updatePackHandler}
                    onClose={() => setIsPackModalOpen(false)}
                    currentPack={cardPacks.find((el) => el._id === currentId)}
                />
            )}
        </GridBox>
    );
};

export default PacksList;
