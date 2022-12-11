import {all} from 'redux-saga/effects';
import cities from "./cities";

// ----------------------------------------------------------------------

function* rootSaga() {
    yield all([
        cities(),
    ]);
}

export default rootSaga;