import React, { useEffect, useState } from "react";
import { SMainTitle, SPagePanel, SPageWrapper } from "../styled";
import { Box } from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input";
import SearchIcon from "../../assets/icons/SearchIcon";
import IconButton from "../../components/IconButton/IconButton";
import FilterIcon from "../../assets/icons/FilterIcon";
import { GridBox } from "../../components/GridBox/GridBox";
import PackCard from "./PackCard/PackCard";
import { getPacks } from "../../../bll/packsReducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Filter from "./Filter/Filter";
import { FilterWrapper } from "./Filter/styled";
import Pagination from "../../components/Pagination/Pagination";
import { SSearchInput } from "./styled";

const PacksList = () => {
    // const dispatch = useAppDispatch();
    // const [searchParams, setSearchParams] = useSearchParams();
    const { packs, cardPacksTotalCount, currentPage, pageCount } =
        useAppSelector((state) => state.packs);

    // useEffect(() => {
    //     dispatch(getPacks(currentPage, 12));
    // }, [currentPage]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <SPageWrapper>
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
                {packs.map((pack) => (
                    <PackCard key={pack._id} pack={pack} />
                ))}
            </GridBox>
            <Pagination
                cardPacksTotalCount={cardPacksTotalCount}
                currentPage={currentPage}
                pageCount={pageCount}
            />
        </SPageWrapper>
    );
};

export default PacksList;
