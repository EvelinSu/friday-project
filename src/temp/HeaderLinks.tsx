import React from 'react';
import {PATH} from "../ui/pages/Pages";
import {useLocation, useNavigate} from "react-router-dom";

const HeaderLinks = () => {

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            position: "fixed",
            bottom: 10,
            left: 0,
            maxWidth: "100%",
            overflow: "auto"

        }}>
            {Object.values(PATH).map(el => (
                <div style={{
                    padding: 10,
                    cursor: "pointer",
                    userSelect: "none",
                    color: location.pathname.includes(el) ? '#7398CE' : ''
                }}
                     key={el} onClick={() => navigate(el)}>
                    {el}
                </div>
            ))}
        </div>
    );
};

export default HeaderLinks;
