import React, { FC, useMemo } from "react";
import { SPackCardActions, SPackCardWrapper } from "./styled";
import { Box } from "../../../components/Box/Box";
import { SText } from "../../../components/Text/SText";
import Avatar from "../../../components/Avatar/Avatar";
import IconButton from "../../../components/IconButton/IconButton";
import EditIcon from "../../../assets/icons/EditIcon";
import BookCheckIcon from "../../../assets/icons/BookCheckIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import { transformDate } from "../../../../common/utils/tarnsformDate";
import { TPack } from "../../../../dal/ResponseTypes";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { deletePack } from "../../../../bll/packsReducer";
import { getActualPacksParams } from "../../../../common/utils/getActualParams";
import { useSearchParams } from "react-router-dom";

type TPackProps = {
    pack: TPack;
};
const PackCard: FC<TPackProps> = ({ pack }) => {
    const user = {
        name: "Ivan Ivanov",
        avatar: "https://i.imgur.com/8806AGy.png",
    };
    // const { name, avatar } = useAppSelector((state) => state.user);
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const correctDate = transformDate(pack.updated);
    const URLParams = useMemo(() => getActualPacksParams(searchParams), [searchParams]);

    const { id } = useAppSelector((state) => state.auth.userData);

    const deletePackHandler = () => {
        dispatch(deletePack(pack._id, URLParams));
    };

    return (
        <SPackCardWrapper>
            <Box
                overflow={"hidden"}
                height={"100%"}
                gap={10}
                flexDirection={"column"}
                justifyContent={"space-between"}
            >
                <SText isEllipsis>{pack.name}</SText>
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
                    <SText isEllipsis>{pack.user_name}</SText>
                </Box>
            </Box>
            <SPackCardActions>
                <IconButton color={"#fff"} size={"sm"} icon={<BookCheckIcon />} />
                {id === pack.user_id && (
                    <>
                        <IconButton color={"#fff"} size={"sm"} icon={<EditIcon />} />
                        <IconButton
                            onClick={deletePackHandler}
                            color={"#fff"}
                            size={"sm"}
                            icon={<DeleteIcon />}
                        />
                    </>
                )}
            </SPackCardActions>
        </SPackCardWrapper>
    );
};

export default PackCard;
