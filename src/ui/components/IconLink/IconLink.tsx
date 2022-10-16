import React from 'react';
import {SIconLink} from "./styled";

type TIconLinkProps = {
    link?: string
    label?: string
    icon?: string
}

const IconLink: React.FC<TIconLinkProps> = (props) => {
    const link = props.link?.includes('http') ? props.link : 'https://' + props.link

    return (
        <SIconLink
            title={props.label}
            target="_blank"
            href={link}
            isDisabled={!props.link}
        >
            {props.icon}
        </SIconLink>
    );
};

export default IconLink;
