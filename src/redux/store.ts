import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";

// ----------------------------------------------------------------------

const isDevelopment = process.env.NODE_ENV === "development"

// ----------------------------------------------------------------------

const sagaMiddleware = createSagaMiddleware();

// ----------------------------------------------------------------------

const store = configureStore({
    reducer: rootReducer,
    devTools: isDevelopment,
    middleware: [
        ...getDefaultMiddleware({
            thunk: false,
            immutableCheck: isDevelopment,
            serializableCheck: isDevelopment
        }),
        sagaMiddleware
    ]
});

// ----------------------------------------------------------------------

sagaMiddleware.run(rootSaga);

// ----------------------------------------------------------------------

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ----------------------------------------------------------------------

export const useTypeDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
export default store;