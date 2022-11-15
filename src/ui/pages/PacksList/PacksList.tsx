import React, { useEffect, useMemo, useState } from "react";
import { SMainTitle, SPagePanel, SPageWrapper } from "../styled";
import { Box } from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input";
import SearchIcon from "../../assets/icons/SearchIcon";
import IconButton from "../../components/IconButton/IconButton";
import FilterIcon from "../../assets/icons/FilterIcon";
import { GridBox } from "../../components/GridBox/GridBox";
import PackCard from "./PackCard/PackCard";
import { loadPacks } from "../../../bll/packsReducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Filter from "./Filter/Filter";
import { FilterWrapper } from "./Filter/styled";
import Pagination from "../../components/Pagination/Pagination";
import { SSearchInput } from "./styled";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoaderIcon from "../../assets/loaders/loader";
import { setCardParams } from "../../../bll/packsParamsReducer";
import { getActualPacksParams } from "../../../utils/getActualParams";
import { PATH } from "../Pages";

const PacksList = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { cardPacks, cardPacksTotalCount, pageCount, isFetching } =
        useAppSelector((state) => state.packs);

    const stateParams = useAppSelector((state) => state.packsParams);
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const URLParams = useMemo(
        () => getActualPacksParams(searchParams),
        [searchParams]
    );

    useEffect(() => {
        if (JSON.stringify(stateParams) !== JSON.stringify(URLParams)) {
        }
        dispatch(setCardParams(URLParams));
    }, [dispatch, URLParams]);

    useEffect(() => {
        if (JSON.stringify(stateParams) === JSON.stringify(URLParams))
            dispatch(loadPacks(stateParams));
    }, [dispatch, stateParams]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(PATH.signIn);
        }
    }, []);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <SPageWrapper>
            {isFetching && <LoaderIcon absolute />}
            <SPagePanel>
                <Box
                    margin={"0 0 10px 0"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <SMainTitle>Packs list</SMainTitle>
                    <Button
                        onClick={() => alert("In progress")}
                        label={"Add new pack"}
                        shadow
                    />
                </Box>
                <Box
                    margin={"0 0 20px 0"}
                    alignItems={"end"}
                    justifyContent={"space-between"}
                >
                    <SSearchInput>
                        <Input
                            title={"Search"}
                            placeholder={"Search by name"}
                            leftIcon={<SearchIcon />}
                        />
                    </SSearchInput>
                    <FilterWrapper margin={"0 0 3px 0"}>
                        <IconButton
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            icon={<FilterIcon />}
                            title={"Filter"}
                            isLightest
                        />
                        {isFilterOpen && <Filter setIsOpen={setIsFilterOpen} />}
                    </FilterWrapper>
                </Box>
            </SPagePanel>
            <GridBox
                padding={"20px 0 0 0"}
                columns={"repeat(auto-fill, minmax(220px, 1fr))"}
            >
                {cardPacks.map((pack) => (
                    <PackCard key={pack._id} pack={pack} />
                ))}
            </GridBox>
            <Pagination
                cardPacksTotalCount={cardPacksTotalCount}
                isFetching={isFetching}
                pageCount={pageCount}
            />
        </SPageWrapper>
    );
};

export default PacksList;
