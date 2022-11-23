import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { SPagePanel, SPageWrapper } from "../styled";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Button from "../../components/Button/Button";
import { UiBox } from "../../components/UiBox/UiBox";
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
import { initialParams } from "../../../common/utils/getUrlParams";
import { setAppMessage } from "../../../bll/appReducer";
import LoaderIcon from "../../assets/loaders/loader";

export type TEventInput = ChangeEvent<HTMLInputElement> & KeyboardEvent<HTMLInputElement>;

const Profile = () => {
    return (
        <SPageWrapper>
            <SPagePanel>
                <BackPageButton to={PATH.packsList + initialParams} />
            </SPagePanel>
            <Box justifyContent={"center"} padding={"10vh 0 0"}>
                <UiBox title={"Personal Information"} body={<ProfileUiBoxBody />} width={"400px"} />
            </Box>
        </SPageWrapper>
    );
};

const ProfileUiBoxBody = () => {
    const dispatch = useAppDispatch();
    const name = useAppSelector((state) => state.auth.userData.name);
    const email = useAppSelector((state) => state.auth.userData.email);
    const avatar = useAppSelector((state) => state.auth.userData.avatar);
    const isFetching = useAppSelector((state) => state.app.isFetching);
    const [value, setValue] = useState(name);

    const onLogoutHandler = () => {
        dispatch(logOutTC());
    };

    const onSaveNameHandler = () => {
        const newName = value?.trim();
        if (newName === name) return;
        if (!newName || newName.length < 1) {
            dispatch(setAppMessage({ text: "Invalid nickname", severity: "error" }));
            setValue(name);
            return;
        } else {
            dispatch(changeUserProfileTC({ name: newName }));
        }
    };

    const onChangeNameHandler = (e: TEventInput) => {
        setValue(e.currentTarget.value);
    };

    return (
        <Box padding={"0 20px"} gap={"30px"} flexDirection={"column"}>
            <SProfileContent>
                {isFetching && <LoaderIcon absolute />}
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
