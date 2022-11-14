import React from "react";
import { SPagination, SPaginationArrow, SPaginationItem } from "./styled";
import SmallArrowIcon from "../../assets/icons/SmallArrowIcon";

type TPaginationProps = {
    totalPagesCount?: number;
    pageCount?: number;
    pageRangeDisplayed?: number;
    marginPagesDisplayed?: number;
    filterName?: string;
};

const Pagination: React.FC<TPaginationProps> = React.memo((props) => {
    const pages = [1, 2, 3, "...", 13];

    return (
        <SPagination>
            <SPaginationArrow isDisabled>
                <SmallArrowIcon rotate={"90deg"} />
            </SPaginationArrow>
            {pages.map((el) => {
                return (
                    <SPaginationItem isActive={el === 1} key={el}>
                        {el}
                    </SPaginationItem>
                );
            })}
            <SPaginationArrow>
                <SmallArrowIcon rotate={"270deg"} />
            </SPaginationArrow>
        </SPagination>
    );
});

export default Pagination;
