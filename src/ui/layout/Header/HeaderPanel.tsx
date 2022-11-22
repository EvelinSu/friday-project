import React, {FC} from "react";
import {Box} from "../../components/Box/Box";
import IconButton from "../../components/IconButton/IconButton";
import MoonIcon from "../../assets/icons/MoonIcon";
import {SText} from "../../components/Text/SText";
import Avatar from "../../components/Avatar/Avatar";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../pages/Pages";
import {UsersIcon} from "../../assets/icons/UsersIcon";

type THeaderPanelProps = {
    avatar: string | null | undefined;
    name: string | null;
};

const HeaderPanel: FC<THeaderPanelProps> = (props) => {
    const navigate = useNavigate();

    const windowWidth = window.innerWidth;

    return (
        <Box alignItems={"center"}>
            <IconButton
                onClick={() => alert("In progress")}
                title={"Dark theme"}
                icon={<MoonIcon />}
            />
            <IconButton
                title={"Users"}
                onClick={() => alert("In progress")}
                icon={<UsersIcon />}
            />
            <Box
                alignItems={"center"}
                gap={10}
                onClick={() => navigate(PATH.profile)}
                cursor={"pointer"}
            >
                {windowWidth > 400 && (
                    <SText maxWidth={"150px"} isEllipsis>
                        {props.name}
                    </SText>
                )}
                <Avatar size={"small"} img={props.avatar ? props.avatar : ""} />
            </Box>
        </Box>
    );
};

export default HeaderPanel;
