import React, { useMemo, useState } from "react";
import PackCard from "./PackCard/PackCard";
import { GridBox } from "../../components/GridBox/GridBox";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";
import AddAndUpdatePackModal, {
    TAddAndUpdatePackModalValues,
} from "./AddAndUpdatePackModal/AddAndUpdatePackModal";
import { getUrlPacksParams } from "../../../common/utils/getActualParams";
import DeletePackModal from "./DeletePackModal/DeletePackModal";
import { updatePack } from "../../../bll/packsReducer";

export type TPackModalsType = "delete" | "update" | false;

const PacksList = () => {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlPacksParams(searchParams), [searchParams]);
    const isFetching = useAppSelector((state) => state.auth.isFetching);
    const { cardPacks } = useAppSelector((state) => state.packs.cardPacksData);
    const [isPackModalOpen, setIsPackModalOpen] = useState<TPackModalsType>(false);
    const [currentId, setCurrentId] = useState<string>("");

    const windowWidth = window.innerWidth;
    const rowsCount = URLParams.pageCount && +URLParams.pageCount > 8 ? +URLParams.pageCount / 5 : 4;

    const onIconClickHandler = (
        e: React.MouseEvent<HTMLDivElement>,
        id: string,
        modalType: TPackModalsType
    ) => {
        e.stopPropagation();
        setIsPackModalOpen(modalType);
        setCurrentId(id);
    };

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
