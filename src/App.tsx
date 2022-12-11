import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoMatch from "./pages/NoMatchPage";
import Layout from "./layouts/Layout";

// ----------------------------------------------------------------------

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />

                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
};

export default App;