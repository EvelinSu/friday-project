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
    const dispatch = useAppDispatch();
    const { packs, totalCount } = useAppSelector((state) => state.packs);

    useEffect(() => {
        dispatch(getPacks(1, 20));
    }, []);

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
                <Box alignItems={"end"} justifyContent={"space-between"}>
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
                        />
                        {isFilterOpen && <Filter setIsOpen={setIsFilterOpen} />}
                    </FilterWrapper>
                </Box>
            </SPagePanel>
            <GridBox
                columns={"repeat(auto-fill, minmax(220px, 1fr))"}
                padding={"40px 0 0 0"}
            >
                {packs.map((pack) => (
                    <PackCard key={pack._id} pack={pack} />
                ))}
            </GridBox>
            <Pagination totalPagesCount={13} />
        </SPageWrapper>
    );
};

export default PacksList;
