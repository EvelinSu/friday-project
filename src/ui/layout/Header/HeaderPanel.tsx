import React, {FC} from "react";
import {Box} from "../../components/Box/Box";
import IconButton from "../../components/IconButton/IconButton";
import MoonIcon from "../../assets/icons/MoonIcon";
import {SText} from "../../components/Text/SText";
import Avatar from "../../components/Avatar/Avatar";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {PATH} from "../../pages/Pages";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {setThemeFromLS} from "../../../bll/appReducer";
import {SunIcon} from "../../assets/icons/SunIcon";
import {initialStringParams} from "../../../common/utils/getUrlParams";
import {FolderFileFillIcon} from "../../assets/icons/FolderFileFillIcon";
import {UsersIcon} from "../../assets/icons/UsersIcon";

type THeaderPanelProps = {
    avatar: string | null | undefined;
    name: string | null;
    isLoggedIn: boolean;
};

const HeaderPanel: FC<THeaderPanelProps> = (props) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const theme = useAppSelector((state) => state.app.currentTheme);
    const myId = useAppSelector((state) => state.auth.myData.id);
    const urlUserId = searchParams.get("user_id");

    const onChangeThemeHandler = () => {
        dispatch(setThemeFromLS(theme === "light" ? "dark" : "light"));
    };

    const windowWidth = window.innerWidth;
    const myPacksFilter = initialStringParams + "&user_id=" + myId;

    return (
        <Box
            margin={"0 0 0 auto"}
            alignItems={"center"}
            gap={windowWidth > 400 ? 20 : 10}
        >
            <IconButton
                onClick={onChangeThemeHandler}
                title={theme === "light" ? "Dark theme" : "Light theme"}
                icon={theme === "light" ? <MoonIcon /> : <SunIcon />}
                size={windowWidth < 400 ? "sm" : "md"}
            />
            {props.isLoggedIn && (
                <>
                    <IconButton
                        title={"Users"}
                        isDisabled={location.pathname.includes(PATH.usersList)}
                        onClick={() => navigate(PATH.usersList + initialStringParams)}
                        icon={<UsersIcon />}
                        size={windowWidth < 400 ? "sm" : "md"}
                    />
                    <IconButton
                        title={"My packs"}
                        isDisabled={location.pathname.includes(PATH.packsList) && urlUserId === myId}
                        onClick={() => navigate(PATH.packsList + myPacksFilter)}
                        icon={<FolderFileFillIcon />}
                        size={windowWidth < 400 ? "sm" : "md"}
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
