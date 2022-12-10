import React from "react";
import {Box} from "../../../components/Box/Box";
import {SMainTitle, SPagePanel} from "../../styled";
import {Search} from "../../../components/Search/Search";
import {UsersFilter} from "../Filter/UsersFilter";

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
                <UsersFilter />
            </Box>
        </SPagePanel>
    );
};

export default UsersPagePanel;
