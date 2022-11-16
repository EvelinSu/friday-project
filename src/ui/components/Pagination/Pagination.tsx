import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MyPaginate } from "./styled";
import SmallArrowIcon from "../../assets/icons/SmallArrowIcon";
import { useDebounce } from "usehooks-ts";

type TPaginationProps = {
    cardPacksTotalCount: number;
    pageCount: number;
    searchText?: string;
    isFetching: boolean;
};

const Pagination: React.FC<TPaginationProps> = React.memo(
    ({ cardPacksTotalCount, pageCount }) => {
        const [searchParams, setSearchParams] = useSearchParams();

        const [value, setValue] = useState(
            searchParams.get("page") ? searchParams.get("page") : "1"
        );
        console.log(searchParams.get("page"));
        const debounceValue = useDebounce(value, 500);

        const pageQuantity = Math.max(
            Math.ceil(cardPacksTotalCount / pageCount)
        );
        const handlePageChange = ({ selected }: { selected: number }) => {
            setValue(`${selected + 1}`);
        };

        useEffect(() => {
            setSearchParams({ page: `${value}`, pageCount: `${pageCount}` });
        }, [debounceValue]);

        return (
            <MyPaginate
                pageCount={pageQuantity}
                pageRangeDisplayed={4}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                previousLabel={<SmallArrowIcon rotate={"90deg"} />}
                nextLabel={<SmallArrowIcon rotate={"270deg"} />}
                pageLinkClassName="page-item"
                activeClassName="active"
                previousLinkClassName={"page-item arrow"}
                nextLinkClassName="page-item arrow"
                breakLabel=". . ."
                breakClassName="page-item"
                breakLinkClassName="page-link"
            />
        );
    }
);

export default Pagination;
