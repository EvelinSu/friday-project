import React, { useMemo, useState } from "react";
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
import AddAndUpdatePackModal, {
    TAddAndUpdatePackModalValues,
} from "../AddAndUpdatePackModal/AddAndUpdatePackModal";
import Avatar from "../../../components/Avatar/Avatar";
import { SText } from "../../../components/Text/SText";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";
import { addNewPack } from "../../../../bll/packsReducer";
import { getUrlPacksParams } from "../../../../common/utils/getActualParams";

const PacksPagePanel = () => {
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlPacksParams(searchParams), [searchParams]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isAddPackModalOpen, setIsAddPackModalOpen] = useState(false);

    const userId = useAppSelector((state) => state.auth.userData.id);
    const otherUserData = useAppSelector((state) => state.user);
    const checkUserId = URLParams.user_id && URLParams.user_id !== userId;
    const dispatch = useAppDispatch();

    const addNewPackHandler = (values: TAddAndUpdatePackModalValues) => {
        dispatch(addNewPack(values, URLParams)).then(() => setIsAddPackModalOpen(false));
    };
    const onFilterBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
        if (e.relatedTarget?.id.includes("filter")) return;
        setIsFilterOpen(false);
    };

    return (
        <SPagePanel>
            <Box margin={"0 0 10px 0"} alignItems={"center"} justifyContent={"space-between"}>
                <SMainTitle>Packs list</SMainTitle>
                {checkUserId ? (
                    <Box alignItems={"center"} gap={10}>
                        <SText maxWidth={"150px"} isEllipsis>
                            {otherUserData.name}
                        </SText>
                        <Avatar size={"small"} img={otherUserData.avatar ? otherUserData.avatar : ""} />
                    </Box>
                ) : (
                    <Button
                        onClick={() => setIsAddPackModalOpen(true)}
                        label={"Add new pack"}
                        withShadow
                    />
                )}
            </Box>
            <Box margin={"0 0 20px 0"} alignItems={"end"} justifyContent={"space-between"}>
                <SSearchInput>
                    <Input title={"Search"} placeholder={"Search by name"} leftIcon={<SearchIcon />} />
                </SSearchInput>
                <FilterWrapper
                    id={"filter"}
                    tabIndex={0}
                    onBlur={onFilterBlurHandler}
                    margin={"0 0 3px 0"}
                >
                    <IconButton
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        icon={<FilterIcon />}
                        title={"Filter"}
                        isLightest
                    />
                    {isFilterOpen && <Filter setIsOpen={setIsFilterOpen} />}
                </FilterWrapper>
            </Box>
            {isAddPackModalOpen && (
                <AddAndUpdatePackModal
                    title={"Add new pack"}
                    onSubmitHandler={addNewPackHandler}
                    onClose={() => setIsAddPackModalOpen(false)}
                />
            )}
        </SPagePanel>
    );
};

export default PacksPagePanel;
