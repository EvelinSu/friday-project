import React, { useState } from "react";
import { Box } from "../../../components/Box/Box";
import { SMainTitle, SPagePanel } from "../../styled";
import Button from "../../../components/Button/Button";
import { SSearchInput } from "../styled";
import Input from "../../../components/Form/Input";
import SearchIcon from "../../../assets/icons/SearchIcon";
import { FilterWrapper } from "../Filter/styled";
import IconButton from "../../../components/IconButton/IconButton";
import FilterIcon from "../../../assets/icons/FilterIcon";
import Filter from "../Filter/Filter";
import { useAppDispatch } from "../../../../hooks/hooks";
import { addNewPack } from "../../../../bll/packsReducer";
import { getActualPacksParams } from "../../../../common/utils/getActualParams";
import { useSearchParams } from "react-router-dom";

const PacksPagePanel = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const URLParams = getActualPacksParams(searchParams);
    const dispatch = useAppDispatch();

    const addNewPackHandler = () => {
        dispatch(addNewPack({ name: "new pack", deckCover: "" }, URLParams));
    };

    return (
        <SPagePanel>
            <Box margin={"0 0 10px 0"} alignItems={"center"} justifyContent={"space-between"}>
                <SMainTitle>Packs list</SMainTitle>
                <Button onClick={addNewPackHandler} label={"Add new pack"} withShadow />
            </Box>
            <Box margin={"0 0 20px 0"} alignItems={"end"} justifyContent={"space-between"}>
                <SSearchInput>
                    <Input title={"Search"} placeholder={"Search by name"} leftIcon={<SearchIcon />} />
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
    );
};

export default PacksPagePanel;
