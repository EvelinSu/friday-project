import React, { FC } from "react";
import { SPackCardActions, SPackCardPrivateIcon, SPackCardWrapper } from "./styled";
import { Box } from "../../../components/Box/Box";
import { SText } from "../../../components/Text/SText";
import Avatar from "../../../components/Avatar/Avatar";
import IconButton from "../../../components/IconButton/IconButton";
import EditIcon from "../../../assets/icons/EditIcon";
import BookCheckIcon from "../../../assets/icons/BookCheckIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import { transformDate } from "../../../../common/utils/tarnsformDate";
import { TPack } from "../../../../dal/ResponseTypes";
import { useAppSelector } from "../../../../hooks/hooks";
import LockFillIcon from "../../../assets/icons/LockFillIcon";
import defaultAvatar from "../../../assets/img/default-photo.png";
import { TPackModals } from "../PacksList";

type TPackProps = {
    pack: TPack;
    onIconClickHandler: (
        e: React.MouseEvent<HTMLDivElement>,
        id: string,
        modalType: TPackModals
    ) => void;
    isFetching: boolean;
};
const PackCard: FC<TPackProps> = React.memo(({ pack, onIconClickHandler, isFetching }) => {
    const { id, avatar } = useAppSelector((state) => state.auth.userData);

    const user = {
        name: "Ivan Ivanov",
        avatar: pack.user_id === id ? avatar : defaultAvatar,
    };
    // const { name, avatar } = useAppSelector((state) => state.user);
    const correctDate = transformDate(pack.updated);

    return (
        <SPackCardWrapper>
            <Box
                overflow={"hidden"}
                height={"100%"}
                gap={10}
                flexDirection={"column"}
                justifyContent={"space-between"}
            >
                <Box alignItems={"center"} gap={"5px"}>
                    {pack.private && (
                        <SPackCardPrivateIcon title={"Private pack"}>
                            <LockFillIcon />
                        </SPackCardPrivateIcon>
                    )}
                    <SText title={pack.name} isEllipsis>
                        {pack.name}
                    </SText>
                </Box>
                <Box gap={5} flexDirection={"column"}>
                    <Box gap={5}>
                        <SText opacity={0.4} whiteSpace={"nowrap"}>
                            Last updated:
                        </SText>
                        <SText isEllipsis>{correctDate}</SText>
                    </Box>
                    <Box gap={5}>
                        <SText opacity={0.4} whiteSpace={"nowrap"}>
                            Total cards:
                        </SText>
                        <SText isEllipsis>{pack.cardsCount}</SText>
                    </Box>
                </Box>
                <Box gap={10} alignItems={"center"}>
                    <Avatar img={user.avatar} size={"smallest"} />
                    <SText title={pack.user_name} isEllipsis>
                        {pack.user_name}
                    </SText>
                </Box>
            </Box>
            <SPackCardActions>
                <IconButton
                    onClick={() => alert("In progress")}
                    color={"#fff"}
                    size={"sm"}
                    isDisabled={isFetching}
                    icon={<BookCheckIcon />}
                />
                {id === pack.user_id && (
                    <>
                        <IconButton
                            onClick={(e) => onIconClickHandler(e, pack._id, "update")}
                            color={"#fff"}
                            size={"sm"}
                            isDisabled={isFetching}
                            icon={<EditIcon />}
                        />
                        <IconButton
                            onClick={(e) => onIconClickHandler(e, pack._id, "delete")}
                            color={"#fff"}
                            size={"sm"}
                            isDisabled={isFetching}
                            icon={<DeleteIcon />}
                        />
                    </>
                )}
            </SPackCardActions>
        </SPackCardWrapper>
    );
});

export default PackCard;
