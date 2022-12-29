import React, {FC} from "react";
import {TResponseUserData} from "../../../../dal/ResponseTypes";
import Avatar from "../../../components/Avatar/Avatar";
import {SUserWrapper} from "./styled";
import defaultPhoto from "../../../assets/img/default-photo.png";
import {Box} from "../../../components/Box/Box";
import {SText} from "../../../components/Text/SText";
import {transformDate} from "../../../../common/utils/tarnsformDate";
import Button from "../../../components/Button/Button";
import {initialStringParams} from "../../../../common/utils/getUrlParams";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../Pages";

type TUserProps = {
    user: TResponseUserData;
};
export const User: FC<TUserProps> = (props) => {
    const navigate = useNavigate()
    const {avatar, name, email, created, publicCardPacksCount, _id} = props.user;

    const createdTime = transformDate(created, true);

    const onClickHandler = () => {
        navigate(PATH.packsList + initialStringParams + "&user_id=" + _id)
    };

    return (
        <SUserWrapper>
            <Box width={"100%"} alignItems={"center"}>
                <Avatar img={avatar || defaultPhoto} />
                <Box
                    gap={"5px"}
                    flexDirection={"column"}
                    overflow={"hidden"}
                >
                    <SText isEllipsis>{name}</SText>
                    {name !== email && (
                        <SText isEllipsis opacity={0.4}>
                            {email}
                        </SText>
                    )}
                </Box>
            </Box>
            <Box gap={10}>
                <SText opacity={0.3}>Registered:</SText>
                <SText>{createdTime}</SText>
            </Box>
            <Box justifyContent={"center"}>
                <Button
                    onClick={onClickHandler}
                    isDisabled={publicCardPacksCount < 1}
                    label={`Packs (${publicCardPacksCount})`}
                />
            </Box>
        </SUserWrapper>
    );
};
