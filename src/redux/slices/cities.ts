import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CityId, CityType} from "../../cities/types";
import {Request} from "./types";
import {AppState} from "../store";

// ----------------------------------------------------------------------

interface CitiesState extends Request {
    mainListCityId: CityId[];
    collection: CityType[];
    collectionId: CityId[];
    wishVisitList: CityId[];
    searchValue: string;
}

const initialState: CitiesState = {
    mainListCityId: [],
    collection: [],
    collectionId: [],
    wishVisitList: [],
    searchValue: "",
    // Request
    loading: false,
    error: null
};

// ----------------------------------------------------------------------

const citiesSlice = createSlice({
    name: `cities`,
    initialState,
    reducers: {
        // Request Cities
        citiesRequested: (state: CitiesState) => {
            state.loading = true;
            state.error = null;
        },
        citiesSucceeded: (state: CitiesState, action: PayloadAction<{ cities: CityType[], citiesId: CityId[] }>) => {
            state.loading = false;
            state.collection = action.payload.cities;
            state.collectionId = action.payload.citiesId;
            state.mainListCityId = action.payload.citiesId;
        },
        citiesFailed: (state: CitiesState, action) => {
            state.loading = false;
            state.error = action.payload.error.message;
        },

        wantToVisitCity: (state: CitiesState, action: PayloadAction<{ cityId: CityId }>) => {
            state.wishVisitList.push(action.payload.cityId);
        },
        dontWantToVisitCity: (state: CitiesState, action: PayloadAction<{ cityId: CityId }>) => {
            state.wishVisitList = state.wishVisitList.filter(cityId => cityId !== action.payload.cityId)
        },
        setSearchValue: (state: CitiesState, action: PayloadAction<{ searchValue: string }>) => {
            state.searchValue = action.payload.searchValue;
        },
        setMainListCityId: (state: CitiesState, action: PayloadAction<CityId[]>) => {
            state.mainListCityId = action.payload;
        },
        setDefaultMainListCityId: (state: CitiesState) => {
            state.mainListCityId = [...state.collectionId];
        },
    }
});

// ----------------------------------------------------------------------

export const getMainList = (state: AppState) => state.cities.mainListCityId;

export const getCitiesList = (state: AppState) => state.cities.collection;

export const getCity = (state: AppState, id: CityId) => state.cities.collection.find(element => element.id === id);

export const getSearchValue = (state: AppState) => state.cities.searchValue;

export const getWishVisitList = (state: AppState) => state.cities.wishVisitList;

export const getIsWishVisitCity = (state: AppState, id: CityId) => state.cities.wishVisitList.includes(id);

// ----------------------------------------------------------------------

export const {
    citiesRequested,
    citiesSucceeded,
    citiesFailed,
    setSearchValue,
    setMainListCityId,
    wantToVisitCity,
    dontWantToVisitCity,
    setDefaultMainListCityId
} = citiesSlice.actions;

export default citiesSlice.reducer;