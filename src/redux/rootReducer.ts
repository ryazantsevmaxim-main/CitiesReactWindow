import {combineReducers} from '@reduxjs/toolkit'
import cities from "./slices/cities";

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
    cities,
})

export default rootReducer;