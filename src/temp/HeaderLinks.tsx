import React from 'react';
import {PATH} from "../ui/pages/Pages";
import {useNavigate} from "react-router-dom";

const HeaderLinks = () => {

    const navigate = useNavigate()

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            position: "fixed",
            bottom: 10,
            left: 0,
        }}>
            {Object.values(PATH).map(el => (
                <div style={{padding: 10, cursor: "pointer"}} key={el} onClick={() => navigate(el)}>
                    {el}
                </div>
            ))}
        </div>
    );
};

export default HeaderLinks;
