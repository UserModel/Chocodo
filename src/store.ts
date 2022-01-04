import { configureStore, combineReducers } from "@reduxjs/toolkit";
import gamesSlice from "./slices/gamesSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [],
        ignoredPaths: [],
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
