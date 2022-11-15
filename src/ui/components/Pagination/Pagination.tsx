import React from "react";
import { useSearchParams } from "react-router-dom";
import { MyPaginate } from "./styled";
import SmallArrowIcon from "../../assets/icons/SmallArrowIcon";

type TPaginationProps = {
    cardPacksTotalCount: number;
    pageCount: number;
    searchText: string;
    isFetching: boolean;
};

const Pagination: React.FC<TPaginationProps> = React.memo(
    ({ cardPacksTotalCount, pageCount, isFetching }) => {
        const [searchParams, setSearchParams] = useSearchParams();
        const page = searchParams.get("page");

        const pageQuantity = Math.max(
            Math.ceil(cardPacksTotalCount / pageCount)
        );
        const handlePageChange = async ({ selected }: { selected: number }) => {
            setSearchParams({ page: `${selected + 1}` });
        };

        return (
            <MyPaginate
                initialPage={page ? +page : 1}
                pageCount={pageQuantity}
                pageRangeDisplayed={4}
                forcePage={8}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                previousLabel={<SmallArrowIcon rotate={"90deg"} />}
                nextLabel={<SmallArrowIcon rotate={"270deg"} />}
                pageLinkClassName={
                    isFetching ? "page-item disabled" : "page-item"
                }
                activeClassName="active"
                previousLinkClassName="page-item arrow"
                nextLinkClassName="page-item arrow"
                breakLabel=". . ."
                breakClassName="page-item"
                breakLinkClassName="page-link"
            />
        );
    }
);

export default Pagination;
