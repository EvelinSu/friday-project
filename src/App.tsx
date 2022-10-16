import React from 'react';
import {HashRouter} from "react-router-dom";
import {SSiteWrapper} from "./ui/layout/styled";
import Header from "./ui/layout/Header/Header";
import Pages from "./ui/pages/Pages";

function App() {
    return (
        <HashRouter>
            <SSiteWrapper>
                <Header />
                <Pages />
            </SSiteWrapper>
        </HashRouter>
    );
}

export default App;
