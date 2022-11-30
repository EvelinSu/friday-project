import React from "react";
import { Box } from "../../../components/Box/Box";
import { SMainTitle, SPagePanel } from "../../styled";
import { Search } from "../../../components/Search/Search";

const UsersPagePanel = () => {
    return (
        <SPagePanel>
            <Box alignItems={"center"} justifyContent={"space-between"}>
                <SMainTitle maxWidth={"300px"} isEllipsis>
                    Users list
                </SMainTitle>
            </Box>
            <Box alignItems={"center"}>
                <Search addParamToUrl={"userName"} />
                {/*<PacksFilter />*/}
            </Box>
        </SPagePanel>
    );
};

export default UsersPagePanel;
