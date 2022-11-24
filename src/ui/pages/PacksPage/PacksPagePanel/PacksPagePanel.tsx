import React, {useMemo, useState} from "react";
import {Box} from "../../../components/Box/Box";
import {SMainTitle, SPagePanel} from "../../styled";
import Button from "../../../components/Button/Button";
import {FilterWrapper} from "../Filter/styled";
import IconButton from "../../../components/IconButton/IconButton";
import FilterIcon from "../../../assets/icons/FilterIcon";
import Filter from "../Filter/Filter";
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {useSearchParams} from "react-router-dom";
import {addNewPack} from "../../../../bll/packsReducer";
import {getUrlParams, initialParams} from "../../../../common/utils/getUrlParams";
import AddAndUpdatePackModal, {TAddAndUpdatePackModalValues,} from "../PacksModals/AddAndUpdatePackModal";
import {Search} from "../../../components/Search/Search";
import {AddIcon} from "../../../assets/icons/AddIcon";
import Avatar from "../../../components/Avatar/Avatar";
import defaultAvatar from "../../../assets/img/default-photo.png"

const PacksPagePanel = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isAddPackModalOpen, setIsAddPackModalOpen] = useState(false);
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const myId = useAppSelector((state) => state.auth.userData.id);
    const otherUserData = useAppSelector((state) => state.user.userData);
    const checkUserId = URLParams.user_id && URLParams.user_id === myId;
    const isFetching = useAppSelector(state => state.app.isFetching)

    const addNewPackHandler = (values: TAddAndUpdatePackModalValues) => {
        dispatch(addNewPack({newCardsPack: values, paramURL: URLParams})).then(() =>
            setIsAddPackModalOpen(false)
        );
    };
    const onFilterBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
        if (e.relatedTarget?.id.includes("filter")) return;
        setIsFilterOpen(false);
    };

    return (
        <SPagePanel>
            <Box
                margin={"0 0 10px 0"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Box margin={"0 0 10px 0"} alignItems={"center"} gap={10}>
                    {URLParams.user_id && !checkUserId && !isFetching && (
                        <Box gap={10} alignItems={"center"}>
                            <Avatar size={"small"} img={otherUserData.avatar ? otherUserData.avatar : defaultAvatar} />
                            <SMainTitle isEllipsis>
                                {otherUserData.name}'s
                            </SMainTitle>
                        </Box>
                    )}
                    <SMainTitle isEllipsis>{checkUserId ? "My packs" : "Packs list"}</SMainTitle>
                </Box>
                {(!URLParams.user_id || checkUserId) && (
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
