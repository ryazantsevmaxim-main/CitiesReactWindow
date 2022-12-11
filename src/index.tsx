// React
import React from 'react';
import ReactDOM from 'react-dom/client';
// React Router
import {BrowserRouter} from "react-router-dom";
// Redux Store
import {Provider as StoreProvider} from 'react-redux'
import store from "./redux/store";
// MUI
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./theme";
// Main Component
import App from './App';


// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

// ----------------------------------------------------------------------

root.render(
    <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CssBaseline/>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </StoreProvider>
);

