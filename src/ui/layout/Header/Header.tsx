import React from 'react';
import {SHeader, SHeaderButton, SHeaderLogo} from "./styled";
import {useLocation, useNavigate} from "react-router-dom";
import Logo from "../../assets/icons/Logo";
import IconButton from "../../components/IconButton/IconButton";
import SignInIcon from "../../assets/icons/SignInIcon";
import {SText} from '../../components/Text/SText';
import HeaderPanel from "./HeaderPanel";
import {PATH} from "../../pages/Pages";

const Header = () => {

    const navigate = useNavigate()
    const location = useLocation()

    // временное
    const auth = {
        isAuth: true,
        account: {
            avatar: 'https://i.imgur.com/WuVqEnk.png',
            name: "Pushok"
        }
    }
    //

    return (
        <SHeader>
            <SHeaderLogo onClick={() => navigate("/")}>
                <Logo />
            </SHeaderLogo>
            {auth.isAuth
                ? <HeaderPanel
                    name={auth.account.name}
                    avatar={auth.account.avatar}
                />
                : <SHeaderButton
                    disabled={location.pathname.includes(PATH.signIn)}
                    onClick={() => navigate(PATH.signIn)}
                >
                    <SText>
                        Sign In
                    </SText>
                    <IconButton icon={<SignInIcon />} />
                </SHeaderButton>
            }
        </SHeader>
    );
};

export default Header;
