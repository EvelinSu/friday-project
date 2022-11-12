import React from 'react';
import LoaderIcon from "../../assets/loaders/loader";
import styled from "styled-components";

const GlobalLoader = () => {
    return (
       <SGlobalLoader>
           <LoaderIcon/>
       </SGlobalLoader>
    );
};

const SGlobalLoader = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.secondary};
    z-index: 100;
`

export default GlobalLoader;
