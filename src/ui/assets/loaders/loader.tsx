import React from 'react';
import styled from "styled-components";

const SLoader = styled.div`
    flex-grow: 1;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoaderIcon = () => {
    return (
        <SLoader>
            <svg
                version="1.0"
                width="64px"
                height="64px"
                viewBox="0 0 128 128"
            >
                <g>
                    <circle cx="16" cy="64" r="16" fill="#222744" fillOpacity="1" />
                    <circle
                        cx="16"
                        cy="64"
                        r="16"
                        fill="#6c6f82"
                        fillOpacity="0.67"
                        transform="rotate(45,64,64)"
                    />
                    <circle cx="16" cy="64" r="16" fill="#a2a4b1" fillOpacity="0.42" transform="rotate(90,64,64)" />
                    <circle
                        cx="16"
                        cy="64"
                        r="16"
                        fill="#d3d4da"
                        fillOpacity="0.2"
                        transform="rotate(135,64,64)"
                    />
                    <circle cx="16" cy="64" r="16" fill="#e5e6e9" fillOpacity="0.12" transform="rotate(180,64,64)" />
                    <circle
                        cx="16"
                        cy="64"
                        r="16"
                        fill="#e5e6e9"
                        fillOpacity="0.12"
                        transform="rotate(225,64,64)"
                    />
                    <circle cx="16" cy="64" r="16" fill="#e5e6e9" fillOpacity="0.12" transform="rotate(270,64,64)" />
                    <circle
                        cx="16"
                        cy="64"
                        r="16"
                        fill="#e5e6e9"
                        fillOpacity="0.12"
                        transform="rotate(315,64,64)"
                    />
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
                        calcMode="discrete"
                        dur="640ms"
                        repeatCount="indefinite"
                    />
                </g>
            </svg>
        </SLoader>

    );
};

export default LoaderIcon;
