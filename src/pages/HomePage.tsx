import React, {FC, memo, useEffect} from 'react';
import {useTypeDispatch} from "../redux/store";
import {citiesRequested} from "../redux/slices/cities";
import Box from '@mui/material/Box';
import Cities from "../cities/Cities";

// ----------------------------------------------------------------------

const HomePage: FC = () => {
    const dispatch = useTypeDispatch();

    useEffect(() => {
        dispatch(citiesRequested());
    }, [dispatch]);

    return (
        <Box style={{height: "100vh"}}>
            <Cities/>
        </Box>
    );
};

export default memo(HomePage);