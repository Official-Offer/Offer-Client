import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

const makeStore = () => configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;

export default store;
