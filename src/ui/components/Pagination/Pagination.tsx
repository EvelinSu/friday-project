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

const Pagination: React.FC<TPaginationProps> = React.memo(({ cardPacksTotalCount, pageCount }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageInState = useAppSelector((state) => state.packs.cardPacksData.page);
    const [value, setValue] = useState(searchParams.get("page") ? searchParams.get("page") : "1");
    const debounceValue = useDebounce(value, 500);
    const userId = useAppSelector((state) => state.packsParams.user_id);

    const pageQuantity = Math.max(Math.ceil(cardPacksTotalCount / pageCount));
    const handlePageChange = ({ selected }: { selected: number }) => {
        setValue(`${selected + 1}`);
    };

    useEffect(() => {
        if (userId) setSearchParams({ page: `${value}`, pageCount: `${pageCount}`, user_id: userId });
        else setSearchParams({ page: `${value}`, pageCount: `${pageCount}` });
    }, [debounceValue]);

    return (
        <MyPaginate
            // initialPage={pageInState ? pageInState - 1 : 0}
            forcePage={pageInState ? pageInState - 1 : 0}
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
});

export default Pagination;
