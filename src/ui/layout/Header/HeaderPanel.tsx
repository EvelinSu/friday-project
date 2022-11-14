import React, { FC } from "react";
import { Box } from "../../components/Box/Box";
import IconButton from "../../components/IconButton/IconButton";
import MoonIcon from "../../assets/icons/MoonIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import { SText } from "../../components/Text/SText";
import Avatar from "../../components/Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../pages/Pages";

type THeaderPanelProps = {
    avatar: string | null | undefined;
    name: string | null;
};

const HeaderPanel: FC<THeaderPanelProps> = (props) => {
    const navigate = useNavigate();

    const windowWidth = window.innerWidth;

    return (
        <Box alignItems={"center"}>
            <IconButton icon={<MoonIcon />} />
            <IconButton icon={<SettingsIcon />} />
            <Box
                cursor={"pointer"}
                alignItems={"center"}
                gap={10}
                onClick={() => navigate(PATH.profile)}
            >
                {windowWidth > 400 && (
                    <SText maxWidth={"150px"} isEllipsis>
                        {props.name}
                    </SText>
                )}

                <Avatar size={"sm"} img={props.avatar ? props.avatar : ""} />
            </Box>
        </Box>
    );
};

export default HeaderPanel;
