import TextField from '@mui/material/TextField';
import React, {ChangeEvent, FC} from 'react';
import {useTypeDispatch, useTypedSelector} from "../redux/store";
import {
    getCitiesList,
    getSearchValue,
    setDefaultMainListCityId,
    setMainListCityId,
    setSearchValue
} from "../redux/slices/cities";
import {CityId} from "./types";
import useDebounce from "../hooks/useDebounce";

// ----------------------------------------------------------------------

const CitySearch: FC = () => {

    const dispatch = useTypeDispatch();

    const searchValue = useTypedSelector(getSearchValue);
    const citiesList = useTypedSelector(getCitiesList);


    const searchCities = (searchNewValue: string) => {
        if (!/^ *$/.test(searchNewValue)) {
            const searchCities: CityId[] = [];

            citiesList.forEach(city => {
                if (city.name.toLowerCase().includes(searchNewValue.toLowerCase()) ||
                    city.population.toLowerCase().includes(searchNewValue.toLowerCase()) ||
                    city.country.toLowerCase().includes(searchNewValue.toLowerCase())) {

                    searchCities.push(city.id);
                }
            })

            dispatch(setMainListCityId(searchCities));

        } else {
            dispatch(setDefaultMainListCityId());
        }
    };

    const debounceSearchCities = useDebounce({callback: searchCities, delay: 500});


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {

        const searchNewValue = e.target.value
        dispatch(setSearchValue({searchValue: searchNewValue}));

        debounceSearchCities(searchNewValue);
    };

    return (
        <TextField
            color="primary"
            label="Search"
            variant="standard"
            fullWidth
            autoComplete="off"
            type="search"
            value={searchValue}
            onChange={handleSearch}
            sx={{mb: "1.5rem"}}
        />
    );
};

export default CitySearch;