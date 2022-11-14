import React from 'react';
import {SPagination, SPaginationItem} from "./styled";
import ArrowIcon from "../../assets/icons/ArrowIcon";

type TPaginationProps = {
    totalPagesCount: number
    filterName?: string
}

const Pagination: React.FC<TPaginationProps> = React.memo((props) => {

    const pages = [1, 2, 3, 4, 5, '...', 13]

    return (
        <SPagination>
            <ArrowIcon />
            {pages.map((el) => {
                return (
                    <SPaginationItem
                        key={el}
                    >
                        {el}
                    </SPaginationItem>
                )
            })}
            <ArrowIcon rotate={"180deg"} />
        </SPagination>
    );
});

export default Pagination;
