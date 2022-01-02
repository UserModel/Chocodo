import { configureStore, combineReducers } from "@reduxjs/toolkit";
import gamesSlice from "./slices/gamesSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const whiteList = ["games"];

const reducers = combineReducers({
  games: gamesSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: whiteList,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistor = persistStore(store);
