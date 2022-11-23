import React, { useMemo, useState } from "react";
import { Box } from "../../../components/Box/Box";
import { SMainTitle, SPagePanel } from "../../styled";
import Button from "../../../components/Button/Button";
import { FilterWrapper } from "../Filter/styled";
import IconButton from "../../../components/IconButton/IconButton";
import FilterIcon from "../../../assets/icons/FilterIcon";
import Filter from "../Filter/Filter";
import Avatar from "../../../components/Avatar/Avatar";
import { SText } from "../../../components/Text/SText";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";
import { addNewPack } from "../../../../bll/packsReducer";
import { getUrlParams, initialParams } from "../../../../common/utils/getUrlParams";
import AddAndUpdatePackModal, {
    TAddAndUpdatePackModalValues,
} from "../PacksModals/AddAndUpdatePackModal";
import { Search } from "../../../components/Search/Search";
import { AddIcon } from "../../../assets/icons/AddIcon";

const PacksPagePanel = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isAddPackModalOpen, setIsAddPackModalOpen] = useState(false);
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const userId = useAppSelector((state) => state.auth.userData.id);
    const otherUserData = useAppSelector((state) => state.user);
    const checkUserId = URLParams.user_id && URLParams.user_id !== userId;

    const addNewPackHandler = (values: TAddAndUpdatePackModalValues) => {
        dispatch(addNewPack({ newCardsPack: values, paramURL: URLParams })).then(() =>
            setIsAddPackModalOpen(false)
        );
    };
    const onFilterBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
        if (e.relatedTarget?.id.includes("filter")) return;
        setIsFilterOpen(false);
    };

    return (
        <SPagePanel>
            <Box margin={"0 0 10px 0"} alignItems={"center"} justifyContent={"space-between"}>
                <Box margin={"0 0 10px 0"}>
                    <SMainTitle>Packs list</SMainTitle>
                </Box>
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
                        label={"Add pack"}
                        icon={<AddIcon />}
                        withShadow
                    />
                )}
            </Box>
            <Box margin={"0 0 20px 0"} alignItems={"center"}>
                <Search />
                <FilterWrapper
                    id={"filter"}
                    tabIndex={0}
                    onBlur={onFilterBlurHandler}
                    margin={"0 0 3px 0"}
                    isActive={`?${searchParams}`.length > initialParams.length + 5}
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
