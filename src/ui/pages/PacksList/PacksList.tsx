import React, { useMemo, useState } from "react";
import PackCard from "./PackCard/PackCard";
import { GridBox } from "../../components/GridBox/GridBox";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";
import AddAndUpdatePackModal, {
    TAddAndUpdatePackModalValues,
} from "./AddAndUpdatePackModal/AddAndUpdatePackModal";
import { getActualPacksParams } from "../../../common/utils/getActualParams";
import DeletePackModal from "./DeletePackModal/DeletePackModal";
import { updatePack } from "../../../bll/packsReducer";
import PacksNotFound from "./PacksNotFound";

export type TPackModalsType = "delete" | "update" | false;

const PacksList = () => {
    const [searchParams] = useSearchParams();
    const { cardPacks } = useAppSelector((state) => state.packs.cardPacksData);
    const [isPackModalOpen, setIsPackModalOpen] = useState<TPackModalsType>(false);

    const pageCount = searchParams.get("page_count");

    const URLParams = useMemo(() => getActualPacksParams(searchParams), [searchParams]);
    const [currentId, setCurrentId] = useState<string>("");
    const dispatch = useAppDispatch();

    const windowWidth = window.innerWidth;
    const rowsCount = pageCount && +pageCount > 8 ? +pageCount / 4 : 3;

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
            rows={windowWidth > 540 ? `repeat(${rowsCount}, minmax(125px, 200px))` : ``}
        >
            {cardPacks.length > 1 ? (
                cardPacks.map((pack) => (
                    <PackCard key={pack._id} pack={pack} onIconClickHandler={onIconClickHandler} />
                ))
            ) : (
                <PacksNotFound />
            )}
            {isPackModalOpen === "delete" && (
                <DeletePackModal onClose={() => setIsPackModalOpen(false)} packId={currentId} />
            )}
            {isPackModalOpen === "update" && (
                <AddAndUpdatePackModal
                    title={"Update pack"}
                    onSubmitHandler={updatePackHandler}
                    onClose={() => setIsPackModalOpen(false)}
                />
            )}
        </GridBox>
    );
};

export default PacksList;
