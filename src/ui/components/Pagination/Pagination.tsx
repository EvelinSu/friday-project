import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MyPaginate } from "./styled";
import SmallArrowIcon from "../../assets/icons/SmallArrowIcon";
import { useDebounce } from "usehooks-ts";
import { useAppSelector } from "../../../hooks/hooks";

type TPaginationProps = {
    cardPacksTotalCount: number;
    pageCount: number;
    searchText?: string;
    isFetching: boolean;
};

const Pagination: React.FC<TPaginationProps> = React.memo(
    ({ cardPacksTotalCount, pageCount }) => {
        const [searchParams, setSearchParams] = useSearchParams();

        const pageInState = useAppSelector(
            (state) => state.packs.cardPacksData.page
        );
        const [value, setValue] = useState(
            searchParams.get("page") ? searchParams.get("page") : "1"
        );
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
                initialPage={value ? +value - 1 : 0}
                // forcePage={6}
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
