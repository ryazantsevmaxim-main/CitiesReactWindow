import React, {FC, useEffect} from 'react';
import {useTypeDispatch} from "../redux/store";
import {citiesRequested} from "../redux/slices/cities";

// ----------------------------------------------------------------------

const HomePage: FC = () => {
    const dispatch = useTypeDispatch();

    useEffect(() => {
        dispatch(citiesRequested());
    });

    return (
        <div>
            123
        </div>
    );
};

export default HomePage;