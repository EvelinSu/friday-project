import React from 'react';
import {SMainTitle, SPagePanel, SPageWrapper} from "../styled";
import {Box} from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input";
import SearchIcon from "../../assets/icons/SearchIcon";
import IconButton from "../../components/IconButton/IconButton";
import FilterIcon from "../../assets/icons/FilterIcon";
import {GridBox} from "../../components/GridBox/GridBox";
import PackCard from "./PackCard/PackCard";

const PacksList = () => {
    return (
        <SPageWrapper>
            <SPagePanel>
                <Box justifyContent={"space-between"}>
                    <SMainTitle>
                        Packs list
                    </SMainTitle>
                    <Button label={"Add new pack"} shadow />
                </Box>
                <Box alignItems={"end"} justifyContent={"space-between"}>
                    <Input title={"Search"} leftIcon={<SearchIcon />} />
                    <IconButton icon={<FilterIcon />} />
                </Box>
            </SPagePanel>
            <GridBox padding={"40px 0 0 0"}>
                {/*Мапим паки*/}
                <PackCard />
            </GridBox>
        </SPageWrapper>
    );
};

export default PacksList;