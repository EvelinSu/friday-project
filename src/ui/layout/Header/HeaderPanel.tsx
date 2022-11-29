import React, { FC } from "react";
import { Box } from "../../components/Box/Box";
import IconButton from "../../components/IconButton/IconButton";
import MoonIcon from "../../assets/icons/MoonIcon";
import { SText } from "../../components/Text/SText";
import Avatar from "../../components/Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../pages/Pages";
import { UsersIcon } from "../../assets/icons/UsersIcon";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {setThemeFromLS} from "../../../bll/appReducer";
import { SunIcon } from "../../assets/icons/SunIcon";

type THeaderPanelProps = {
    avatar: string | null | undefined;
    name: string | null;
    isLoggedIn: boolean;
};

const HeaderPanel: FC<THeaderPanelProps> = (props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.app.currentTheme);
    const onChangeThemeHandler = () => {
        dispatch(setThemeFromLS(theme === "light" ? "dark" : "light"));
    };

    const windowWidth = window.innerWidth;

    return (
        <Box margin={"0 0 0 auto"} alignItems={"center"}>
            <IconButton
                onClick={onChangeThemeHandler}
                title={theme === "light" ? "Dark theme" : "Light theme"}
                icon={theme === "light" ? <MoonIcon /> : <SunIcon />}
            />
            {props.isLoggedIn && (
                <>
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
                </>
            )}
        </Box>
    );
};

export default HeaderPanel;
