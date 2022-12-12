import {Action} from "@redux-saga/types";
import {call, put, takeLatest} from "redux-saga/effects";
import {citiesFailed, citiesRequested, citiesSucceeded} from "../../slices/cities";
import {fetchCities} from "./api";
import Papa from "papaparse";
import {AxiosResponse} from "axios";
import {CityId, CityType} from "../../../cities/types";

// ----------------------------------------------------------------------

function* citiesRequest() {
    try {
        const response: AxiosResponse = yield call(fetchCities);

        const text: string = response.data;
        const {data} = Papa.parse<string>(text);

        const citiesId: CityId[] = [];
        data.shift();

        const cities: CityType[] = data.map((element, index) => {
            citiesId.push(index + 1);

            return {
                id: (index + 1),
                name: element[0],
                lat: element[1],
                lng: element[2],
                country: element[3],
                population: element[4]
            }
        });

        yield put(citiesSucceeded({cities, citiesId}));

    } catch (error) {
        yield put(citiesFailed({error}));
    }
}

// ----------------------------------------------------------------------

function* cities() {
    yield takeLatest<Action>(citiesRequested, citiesRequest);
}

export default cities;