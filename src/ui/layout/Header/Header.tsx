import React, { useMemo } from "react";
import { SHeader, SHeaderButton, SHeaderLogo } from "./styled";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../../assets/icons/Logo";
import IconButton from "../../components/IconButton/IconButton";
import SignInIcon from "../../assets/icons/SignInIcon";
import { SText } from "../../components/Text/SText";
import HeaderPanel from "./HeaderPanel";
import { PATH } from "../../pages/Pages";
import { useAppSelector } from "../../../hooks/hooks";
import defaultPhoto from "../../assets/img/default-photo.png";
import { getUrlPacksParams } from "../../../common/utils/getActualParams";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const URLParams = useMemo(() => getUrlPacksParams(searchParams), [searchParams]);

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const userData = useAppSelector((state) => state.auth.userData);

    return (
        <SHeader>
            <SHeaderLogo
                onClick={() => navigate(PATH.packsList + `?page=1&pageCount=${URLParams.pageCount}`)}
            >
                <Logo />
            </SHeaderLogo>
            {isLoggedIn ? (
                <HeaderPanel
                    name={userData.name || userData.email}
                    avatar={userData.avatar || defaultPhoto}
                />
            ) : (
                <SHeaderButton
                    disabled={location.pathname.includes(PATH.signIn)}
                    onClick={() => navigate(PATH.signIn)}
                >
                    <SText isEllipsis>Sign In</SText>
                    <IconButton icon={<SignInIcon />} />
                </SHeaderButton>
            )}
        </SHeader>
    );
};

export default Header;
