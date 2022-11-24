import React from 'react';
import {SMegaShadow} from "../../../components/MegaShadow/styled";
import {UiBox} from "../../../components/UiBox/UiBox";
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {setIsUserProfileOpen} from "../../../../bll/userReducer";
import {Box} from "../../../components/Box/Box";
import Avatar from "../../../components/Avatar/Avatar";
import defaultAvatar from "../../../assets/img/default-photo.png"
import LoaderIcon from "../../../assets/loaders/loader";
import {transformDate} from "../../../../common/utils/tarnsformDate";
import {SText} from '../../../components/Text/SText';
import Button from "../../../components/Button/Button";
import {useSearchParams} from "react-router-dom";
import {initialParams} from "../../../../common/utils/getUrlParams";

export const UserProfileModal = () => {
    const dispatch = useAppDispatch()

    const userName = useAppSelector(state => state.user.userData.name)
    const isUserFetching = useAppSelector(state => state.user.isUserFetching)

    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        dispatch(setIsUserProfileOpen(false));
    };

    return (
        <SMegaShadow onClick={onClickHandler}>
            <UiBox title={!isUserFetching ? userName : ""} body={<UserProfile />} />
        </SMegaShadow>
    );
};

const UserProfile = () => {
    const dispatch = useAppDispatch()

    const [, setSearchParams] = useSearchParams()
    const userData = useAppSelector(state => state.user.userData)
    const isUserFetching = useAppSelector(state => state.user.isUserFetching)

    const registerDate = transformDate(userData.created)
    const lastActivityDate = transformDate(userData.updated, true)

    const onClickHandler = () => {
        setSearchParams(`${initialParams}&user_id=${userData._id}`)
        dispatch(setIsUserProfileOpen(false));

    }

    return isUserFetching ? <LoaderIcon /> : (
        <Box flexDirection={"column"} gap={30}>
            <Box width={"100%"} justifyContent={"center"}>
                <Avatar size={"large"} img={userData.avatar || defaultAvatar} />
            </Box>
            <Box flexDirection={"column"} gap={10}>
                <Box justifyContent={"space-between"}>
                    <SText opacity={0.4}>Registered:</SText>
                    <SText>{registerDate}</SText>
                </Box>
                <Box justifyContent={"space-between"}>
                    <SText opacity={0.4}>Last activity:</SText>
                    <SText>{lastActivityDate}</SText>
                </Box>
                <Box justifyContent={"space-between"}>
                    <SText opacity={0.4}>Total packs count:</SText>
                    <SText>{userData.publicCardPacksCount}</SText>
                </Box>
            </Box>
            <Box justifyContent={"center"}>
                <Button onClick={onClickHandler} label={"View packs"} withShadow />
            </Box>
        </Box>
    )
}
