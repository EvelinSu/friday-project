import React from 'react';
import {SHeader, SHeaderItem} from "./styled";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../pages/Pages";

const Header = () => {

    const navigate = useNavigate()

    return (
        <SHeader>
            {PATH.map(({link, title}, i) => (
                <SHeaderItem key={i} onClick={() => navigate(link)}>
                    {title}
                </SHeaderItem>
            ))}
        </SHeader>
    );
};

export default Header;
