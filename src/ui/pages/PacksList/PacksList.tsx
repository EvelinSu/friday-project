import React, {useEffect, useState} from "react";
import {SMainTitle, SPagePanel, SPageWrapper} from "../styled";
import {Box} from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input";
import SearchIcon from "../../assets/icons/SearchIcon";
import IconButton from "../../components/IconButton/IconButton";
import FilterIcon from "../../assets/icons/FilterIcon";
import {GridBox} from "../../components/GridBox/GridBox";
import PackCard from "./PackCard/PackCard";
import {getPacks} from "../../../bll/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import Filter from "./Filter/Filter";
import {FilterWrapper} from "./Filter/styled";

const PacksList = () => {

    const dispatch = useAppDispatch()
    const {packs, totalCount} = useAppSelector(state => state.packs)

    useEffect(() => {
        dispatch(getPacks(1, 15))
    }, [])

    const [isFilterOpen, setIsFilterOpen] = useState(true)

    return (
        <SPageWrapper>
            <SPagePanel>
                <Box
                    margin={"0 0 10px 0"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <SMainTitle>Packs list</SMainTitle>
                    <Button label={"Add new pack"} shadow />
                </Box>
                <Box alignItems={"end"} justifyContent={"space-between"}>
                    <Input title={"Search"} leftIcon={<SearchIcon />} />
                    <FilterWrapper>
                        <IconButton
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            icon={<FilterIcon />}
                        />
                        {isFilterOpen && <Filter />}
                    </FilterWrapper>
                </Box>
            </SPagePanel>
            <GridBox columns={"repeat(auto-fill, minmax(220px, 1fr))"} padding={"40px 0 0 0"}>
                {packs.map((pack) => (
                    <PackCard
                        key={pack._id}
                        pack={pack}
                    />
                ))}
            </GridBox>
            {/*<Pagination totalPagesCount={13} />*/}
        </SPageWrapper>
    );
};

export default PacksList;
