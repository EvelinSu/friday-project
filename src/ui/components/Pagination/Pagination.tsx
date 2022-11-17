import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MyPaginate } from "./styled";
import SmallArrowIcon from "../../assets/icons/SmallArrowIcon";
import { useDebounce } from "usehooks-ts";
import { useAppSelector } from "../../../hooks/hooks";
import { getUrlPacksParams } from "../../../common/utils/getActualParams";

type TPaginationProps = {
    cardPacksTotalCount: number;
    pageCount: number;
    searchText?: string;
    isFetching: boolean;
};

const Pagination: React.FC<TPaginationProps> = React.memo(({ cardPacksTotalCount, pageCount }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlPacksParams(searchParams), [searchParams]);

    const pageInState = useAppSelector((state) => state.packs.cardPacksData.page);
    const [value, setValue] = useState(URLParams.page);
    const debounceValue = useDebounce(value, 500);

    const pageQuantity = Math.max(Math.ceil(cardPacksTotalCount / pageCount));
    const handlePageChange = ({ selected }: { selected: number }) => {
        setValue(`${selected + 1}`);
    };

    useEffect(() => {
        setSearchParams({ ...URLParams, page: `${value}` });
    }, [debounceValue]);

    return (
        <MyPaginate
            forcePage={pageInState > -1 ? pageInState - 1 : 0}
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
