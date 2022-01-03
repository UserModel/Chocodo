/* eslint-disable no-param-reassign */
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { Game } from "../models/game";
import { RootState } from "../store";

/**
 * The initial state of the GamesSlice
 */
const initialState: User = {
  currentGame: 0,
  loading: false,
  gameList: [],
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    updateGameLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateCurrentGame(state, action: PayloadAction<number>) {
      state.currentGame = action.payload;
    },
    addGame(state, action: PayloadAction<Game>) {
      state.gameList = [...state.gameList, action.payload];
    },
    deleteGame(state, action: PayloadAction<number>) {
      state.gameList = state.gameList.filter(
        (game) => game.id !== action.payload
      );
    },
    updateGame(state, action: PayloadAction<Game>) {
      state.gameList = state.gameList.map((game) =>
        game.id === action.payload.id
          ? { ...game, ...action.payload }
          : game
      );
    },
  },
});

export const {
  updateGameLoading,
  updateCurrentGame,
  addGame,
  deleteGame,
  updateGame,
} = gamesSlice.actions;

// Thunk to add new game
export const addNewGame = (gameObject: Game) => async (dispatch: Dispatch<any>) => {
  dispatch(updateGameLoading(true));
  dispatch(addGame(gameObject));
  dispatch(updateGameLoading(false));
};

export const setCurrentGame = (id: number) => async (dispatch: Dispatch<any>) => {
  dispatch(updateGameLoading(true));
  dispatch(updateCurrentGame(id));
  dispatch(updateGameLoading(false));
}

const gamesList = (state: RootState) => state.games.gameList;
const currentGame = (state: RootState) =>
  state.games.currentGame === null
    ? null
    : state.games.gameList[state.games.currentGame];

export const gamesSelectors = {
  gamesList,
  currentGame,
};

export default gamesSlice;
