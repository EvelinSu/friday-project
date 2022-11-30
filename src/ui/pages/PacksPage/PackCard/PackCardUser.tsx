import React, { FC } from "react";
import Avatar from "../../../components/Avatar/Avatar";
import { SText } from "../../../components/Text/SText";
import { SPackCardUser } from "./styled";
import defaultAvatar from "../../../assets/img/default-photo.png";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { getUser, setIsUserProfileOpen } from "../../../../bll/usersReducer";

type TPackCardUserProps = {
    userName: string;
    myId: string | null;
    userId: string;
};
export const PackCardUser: FC<TPackCardUserProps> = (props) => {
    const dispatch = useAppDispatch();
    const myAvatar = useAppSelector((state) => state.auth.myData.avatar);
    const avatar = props.userId === props.myId ? myAvatar : defaultAvatar;

    const onUserClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        dispatch(getUser(props.userId));
        dispatch(setIsUserProfileOpen(true));
    };

    return (
        <SPackCardUser onClick={onUserClickHandler}>
            <Avatar img={avatar} size={"smallest"} />
            <SText title={props.userName} isEllipsis>
                {props.userName}
            </SText>
        </SPackCardUser>
    );
};
