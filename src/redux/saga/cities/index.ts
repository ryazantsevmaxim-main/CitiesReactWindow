import {Action} from "@redux-saga/types";
import {call, put, takeLatest} from "redux-saga/effects";
import {citiesFailed, citiesRequested, citiesSucceeded} from "../../slices/cities";
import {fetchCities} from "./api";
import Papa from "papaparse";

// ----------------------------------------------------------------------

function* citiesRequest() {
    try {
        // @ts-ignore
        const response = yield call(fetchCities);
        console.log(response);
        const res = response.body.getReader();
        console.log(res);
        const text = response.text();
        const {data} = Papa.parse(text);

        const citiesId: number[] = [];
        data.shift();

        const cities = data.map((element, index) => {
            citiesId.push(index + 1);

            return {
                id: (index + 1),
                // @ts-ignore
                name: element[0],
                // @ts-ignore
                lat: element[1],
                // @ts-ignore
                lng: element[2],
                // @ts-ignore
                country: element[3],
                // @ts-ignore
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