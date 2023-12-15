import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Choose your storage engine

import rootReducer from "./reducers";

const persistConfig = {
    key: 'root',
    storage,
    // Specify the reducers you want to persist
    whitelist: ['account', 'jobs'], // In this example, we persist the 'user' reducer
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({ reducer: rootReducer });

const store = configureStore({ reducer: persistedReducer });

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistor = persistStore(store);
export default store;
