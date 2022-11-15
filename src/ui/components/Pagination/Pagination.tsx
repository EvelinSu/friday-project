import React from "react";

import ReactPaginate from "react-paginate";
import { useAppDispatch } from "../../../hooks/hooks";
import { getPacks } from "../../../bll/packsReducer";

type TPaginationProps = {
    cardPacksTotalCount: number;
    currentPage: number;
    pageCount: number;
};

const Pagination: React.FC<TPaginationProps> = React.memo(
    ({ cardPacksTotalCount, currentPage, pageCount }) => {
        // const pages = [1, 2, 3, 4, 5, "...", 13];

        const dispatch = useAppDispatch();
        const pageQuantity = Math.max(
            Math.ceil(cardPacksTotalCount / pageCount)
        );
        const handlePageChange = ({ selected }: { selected: number }) => {
            dispatch(getPacks(selected + 1, 12));
        };

        return (
            <ReactPaginate
                initialPage={currentPage - 1}
                pageCount={pageQuantity}
                pageRangeDisplayed={4}
                marginPagesDisplayed={1}
                // forcePage={currentPage - 1}
                onPageChange={handlePageChange}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />

            // <SPagination>
            //     <ArrowIcon />
            //     {pages.map((el) => {
            //         return <SPaginationItem key={el}>{el}</SPaginationItem>;
            //     })}
            //     <ArrowIcon rotate={"180deg"} />
            // </SPagination>
        );
    }
);

export default Pagination;
