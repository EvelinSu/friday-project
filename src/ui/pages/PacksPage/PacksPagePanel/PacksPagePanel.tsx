import React, { useMemo, useState } from "react";
import { Box } from "../../../components/Box/Box";
import { SMainTitle, SPagePanel } from "../../styled";
import Button from "../../../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { useSearchParams } from "react-router-dom";
import { addNewPack } from "../../../../bll/packsReducer";
import { getUrlParams } from "../../../../common/utils/getUrlParams";
import AddAndUpdatePackModal, {
    TAddAndUpdatePackModalValues,
} from "../PacksModals/AddAndUpdatePackModal";
import { Search } from "../../../components/Search/Search";
import { AddIcon } from "../../../assets/icons/AddIcon";
import Avatar from "../../../components/Avatar/Avatar";
import defaultAvatar from "../../../assets/img/default-photo.png";
import { PacksFilter } from "../Filter/PacksFilter";

const PacksPagePanel = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const [isAddPackModalOpen, setIsAddPackModalOpen] = useState(false);
    const URLParams = useMemo(() => getUrlParams(searchParams), [searchParams]);

    const myId = useAppSelector((state) => state.auth.myData.id);
    const otherUserData = useAppSelector((state) => state.users.userData);
    const checkUserId = URLParams.user_id && URLParams.user_id === myId;
    const isFetching = useAppSelector((state) => state.app.isFetching);

    const addNewPackHandler = (values: TAddAndUpdatePackModalValues) => {
        dispatch(addNewPack({ newCardsPack: values, paramURL: URLParams })).then(
            (res) => res.payload && setIsAddPackModalOpen(false)
        );
    };

    return (
        <SPagePanel>
            <Box alignItems={"center"} justifyContent={"space-between"}>
                <Box alignItems={"center"} gap={10}>
                    {URLParams.user_id && !checkUserId && !isFetching && (
                        <Box gap={10} alignItems={"center"}>
                            <Avatar
                                size={"small"}
                                img={otherUserData.avatar ? otherUserData.avatar : defaultAvatar}
                            />
                            <SMainTitle maxWidth={"300px"} isEllipsis>
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
            <Box alignItems={"center"}>
                <Search addParamToUrl={"packName"} />
                <PacksFilter />
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
