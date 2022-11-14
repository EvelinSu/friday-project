import React, {useState} from 'react';
import Select from "../../../components/Select/Select";
import {SFilterWrapper} from "./styled";
import DoubleRange from "../../../components/DoubleRange/DoubleRange";
import {Box} from "../../../components/Box/Box";

const Filter = () => {

    const options = ['1', '2', '3']
    const [option, onChangeOption] = useState(options[0])

    const [value1, setValue1] = useState(3)
    const [value2, setValue2] = useState(7)

    return (
        <SFilterWrapper>
            <Select options={options} onChangeOption={onChangeOption} value={option} />
            <Box>
                <Box width={20}>
                    {value1}
                </Box>
                <DoubleRange setValue1={setValue1} setValue2={setValue2} values={[value1, value2]} minmax={[0, 10]} />
                <Box width={20}>
                    {value2}
                </Box>
            </Box>
        </SFilterWrapper>
    );
};

export default Filter;
