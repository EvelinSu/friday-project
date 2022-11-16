import React from "react";
import PackCard from "./PackCard/PackCard";
import { GridBox } from "../../components/GridBox/GridBox";
import { useAppSelector } from "../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";

const PacksList = () => {
    const [searchParams] = useSearchParams();
    const { cardPacks } = useAppSelector((state) => state.packs.cardPacksData);

    const pageCount = searchParams.get("pageCount");

    const windowWidth = window.innerWidth;
    const rowsCount = pageCount && +pageCount > 8 ? +pageCount / 4 : 3;

    return (
        <GridBox
            padding={"20px 0 0 0"}
            columns={"repeat(auto-fill, minmax(220px, 1fr))"}
            rows={windowWidth > 540 ? `repeat(${rowsCount}, minmax(125px, 200px))` : ``}
        >
            {cardPacks.map((pack) => (
                <PackCard key={pack._id} pack={pack} />
            ))}
        </GridBox>
    );
};

export default PacksList;
