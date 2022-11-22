import React, {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {MyPaginate} from "./styled";
import SmallArrowIcon from "../../assets/icons/SmallArrowIcon";
import {useDebounce} from "usehooks-ts";
import {useAppSelector} from "../../../hooks/hooks";
import {getUrlParams} from "../../../common/utils/getUrlParams";

type TPaginationProps = {
    totalCount: number;
    pageCount: number;
    searchText?: string;
    isFetching: boolean;
};

const Pagination: React.FC<TPaginationProps> = React.memo(({totalCount, pageCount}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const [value, setValue] = useState(URLParams.page);
    const pageInState = useAppSelector((state) => state.packs.cardPacksData.page);
    const debounceValue = useDebounce(value, 500);

    const pageQuantity = Math.max(Math.ceil(totalCount / pageCount));
    const handlePageChange = ({selected}: { selected: number }) => {
        setValue(`${selected + 1}`);
    };

    useEffect(() => {
        if (URLParams.page !== value) {
            setSearchParams({...URLParams, page: `${value}`});
        }
    }, [debounceValue]);

    return (
        <MyPaginate
            forcePage={pageInState > -1 ? pageInState - 1 : 0}
            pageCount={pageQuantity}
            pageRangeDisplayed={3}
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
