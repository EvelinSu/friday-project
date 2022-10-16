import React from 'react';
import {SMainTitle, SPageContent, SPageWrapper} from "../styled";
import Input from "../../components/Form/Input";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import { Box } from '../../components/Box/Box';


const Test = () => {
    return (
        <SPageWrapper>
            <SMainTitle>
                Test page
            </SMainTitle>
            <SPageContent>
                <Box flexDirection={"column"} alignItems={"center"}>
                    <Input/>
                    <Checkbox label={'Test'}/>
                    <Button label={'Test'}/>
                </Box>
            </SPageContent>
        </SPageWrapper>
    );
};

export default Test;
