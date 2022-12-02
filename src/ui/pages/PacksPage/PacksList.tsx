import React, { useCallback, useMemo, useState } from "react";
import PackCard from "./PackCard/PackCard";
import { GridBox, SGridDefaultBlock } from "../../components/GridBox/GridBox";
import { useAppSelector } from "../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";
import { getUrlParams } from "../../../common/utils/getUrlParams";
import { getCountArray } from "../../../common/utils/getCountArray";
import { baseTheme } from "../../styles/themes/baseTheme";
import { PackModals } from "./PacksModals/PackModals";

const windowWidth = window.innerWidth;
const smallScreen = baseTheme.media.small;

const PacksList = () => {
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const isFetching = useAppSelector((state) => state.app.isFetching);
    const cardPacks = useAppSelector((state) => state.packs.cardPacksData.cardPacks);

    const [isPackModalOpen, setIsPackModalOpen] = useState<TPackModals>(false);
    const [currentId, setCurrentId] = useState<string>("");

    const onIconClickHandler = useCallback(
        (e: React.MouseEvent<HTMLDivElement>, id: string, modalType: TPackModals) => {
            e.stopPropagation();
            setIsPackModalOpen(modalType);
            setCurrentId(id);
        },
        []
    );

    const rowsCount = URLParams.pageCount && +URLParams.pageCount > 8 ? +URLParams.pageCount / 4 : 4;

    const cardsSkeleton = getCountArray(Number(URLParams.pageCount) - cardPacks.length || 0).map(
        (el) => <SGridDefaultBlock minHeight={"145px"} key={el}></SGridDefaultBlock>
    );

    return (
        <GridBox
            columns={"repeat(auto-fill, minmax(250px, 1fr))"}
            style={{flexGrow: windowWidth > smallScreen ? 1 : ""}}
            rows={windowWidth > smallScreen ? `repeat(${rowsCount}, minmax(145px, 200px))` : ``}
        >
            {cardPacks.map((pack) => (
                <PackCard
                    key={pack._id}
                    pack={pack}
                    onIconClickHandler={onIconClickHandler}
                    isFetching={isFetching}
                />
            ))}
            {windowWidth > smallScreen && cardsSkeleton}
            <PackModals
                modalType={isPackModalOpen}
                currentId={currentId}
                setIsPackModalOpen={setIsPackModalOpen}
                currentPack={cardPacks.find((el) => el._id === currentId)}
            />
        </GridBox>
    );
};

export type TPackModals = "delete" | "update" | "view" | false;

export default PacksList;
