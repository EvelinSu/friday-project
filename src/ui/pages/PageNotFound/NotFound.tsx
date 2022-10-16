import React from 'react';
import PageNotFoundImage  from '../../assets/img/PageNotFoundImage.gif';
import {SPageNotFound, SPageNotFoundImage, SPageNotFoundTitle} from "./styled";

const PageNotFound = () => {
    return (
        <SPageNotFound>
            <SPageNotFoundTitle>
                404
            </SPageNotFoundTitle>
            <SPageNotFoundTitle>
                Not Found
            </SPageNotFoundTitle>
            <SPageNotFoundImage src={PageNotFoundImage}/>
        </SPageNotFound>
    );
};

export default PageNotFound;
