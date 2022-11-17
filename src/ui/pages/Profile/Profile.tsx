import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { SPagePanel, SPageWrapper } from "../styled";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Button from "../../components/Button/Button";
import { Navigate, useSearchParams } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { Box } from "../../components/Box/Box";
import Avatar from "../../components/Avatar/Avatar";
import defaultPhoto from "../../assets/img/default-photo.png";
import { SText } from "../../components/Text/SText";
import { PATH } from "../Pages";
import { changeUserProfileTC, logOutTC } from "../../../bll/authReducer";
import EditableSpan from "../../components/EditableSpan/EditableSpan";
import SignOutIcon from "../../assets/icons/SignOutIcon";
import { SProfileButton, SProfileContent } from "./styled";
import BackPageButton from "../../components/BackPageButton/BackPageButton";
import { setAppMessage } from "../../../bll/appReducer";
import { getActualPacksParams } from "../../../common/utils/getActualParams";

export type EventInputType = ChangeEvent<HTMLInputElement> & KeyboardEvent<HTMLInputElement>;

const Profile = () => {
    const auth = useAppSelector((state) => state.auth);
    const [pathParams] = useSearchParams();
    const actualUrlParams = getActualPacksParams(pathParams);
    if (!auth.isLoggedIn) {
        return <Navigate to={PATH.signIn} />;
    }

    return (
        <SPageWrapper>
            <SPagePanel>
                <BackPageButton
                    to={PATH.packsList + `?page=1&page_count=${actualUrlParams.pageCount}`}
                />
            </SPagePanel>
            <Box justifyContent={"center"} padding={"10vh 0 0"}>
                <Modal title={"Personal Information"} body={<ProfileModalBody />} width={"400px"} />
            </Box>
        </SPageWrapper>
    );
};

const ProfileModalBody = () => {
    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { isFetching } = useAppSelector((state) => state.auth);
    const { name, email, avatar } = auth.userData;

    const [value, setValue] = useState(name);

    const onLogoutHandler = () => {
        dispatch(logOutTC());
    };

    const onSaveNameHandler = () => {
        const newName = value?.trim();
        if (newName && newName.length && newName.length > 3 && newName !== name) {
            dispatch(changeUserProfileTC({ name: newName }));
        } else {
            dispatch(
                setAppMessage({
                    text: "Nickname has not been changed",
                    severity: "error",
                })
            );
            setValue(name);
        }
    };

    const onChangeNameHandler = (e: EventInputType) => {
        setValue(e.currentTarget.value);
    };

    return (
        <Box padding={"0 20px"} gap={"30px"} flexDirection={"column"}>
            <SProfileContent>
                <Avatar
                    size={"large"}
                    img={avatar || defaultPhoto}
                    onClick={() => alert("In progress")}
                    isEditable
                />
                <Box width={"100%"} flexDirection={"column"} overflow={"hidden"}>
                    <EditableSpan
                        value={value || ""}
                        fontSize={"20px"}
                        onKeyDown={onChangeNameHandler}
                        onChange={onChangeNameHandler}
                        onSave={onSaveNameHandler}
                        placeholder={"Nickname"}
                    />
                    <SText title={email ? email : ""} isEllipsis fontSize={"14px"} fontWeight={300}>
                        {email}
                    </SText>
                </Box>
            </SProfileContent>
            <SProfileButton>
                <Button
                    label={"Log out"}
                    onClick={onLogoutHandler}
                    icon={<SignOutIcon />}
                    isLoading={isFetching}
                    withBorder
                />
            </SProfileButton>
        </Box>
    );
};

export default Profile;
