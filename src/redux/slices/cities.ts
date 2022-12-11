import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {City} from "../../cities/types";
import {Request} from "./types";

// ----------------------------------------------------------------------

interface CitiesState extends Request {
    collection: City[];
    listId: number[];
    wishVisit: [];
    searchValue: string;
    modalWindowId: null;
}

const initialState: CitiesState = {
    collection: [],
    listId: [],
    wishVisit: [],
    searchValue: "",
    modalWindowId: null,
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
        citiesSucceeded: (state, action: PayloadAction<{cities: City[], citiesId: number[]}>) => {
            state.loading = false;
            state.collection = action.payload.cities;
            state.listId = action.payload.citiesId;
        },
        citiesFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },

        // wantToVisit: (state, action) => {
        //     state.wishVisit.push(action.payload.cityId);
        // },
        // dontWantToVisit: (state, action) => {
        //     state.wishVisit = state.wishVisit.filter(element => element !== action.payload.cityId)
        // },
        // search: (state, action) => {
        //     state.searchValue = action.payload.searchValue;
        // },
        // openModalWindow: (state, action) => {
        //     state.modalWindowId = action.payload.city;
        // },
        // closeModalWindow: (state) => {
        //     state.modalWindowId = null;
        // },
    }
});

// ----------------------------------------------------------------------

export const {
    citiesRequested,
    citiesSucceeded,
    citiesFailed,
    // wantToVisit,
    // dontWantToVisit,
    // search,
    // openModalWindow,
    // closeModalWindow
} = citiesSlice.actions;

export default citiesSlice.reducer;