/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

/**
 * The initial state of the GamesSlice
 */
const initialState = {
  currentGame: null,
  loading: false,
  gameList: [
    {
      name: "",
      gameIconURL: "",
      timezone: "",
      weeklyResetDOW: "",
      weeklyResetTime: "",
      dailyResetTime: "",
      tasks: [],
      dailyTasks: [],
      weeklyTasks: [],
    },
  ],
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    updateGameLoading(state, action) {
      state.loading = action.payload;
    },
    addGame(state, action) {
      state.gameList = [...state.gameList, action.payload];
    },
    deleteGame(state, action) {
      state.gameList = state.gameList.filter(
        (game) => game.name !== action.payload
      );
    },
    updateGame(state, action) {
      state.gameList = state.gameList.map((game) =>
        game.name === action.payload.name
          ? { ...game, ...action.payload }
          : game
      );
    },
  },
});

export const {
  updateGameLoading,
  addGame,
  deleteGame,
  updateGame,
} = gamesSlice.actions;

// Thunk to add new game
export const addNewGame = (gameObject) => async (dispatch) => {
  dispatch(updateGameLoading(true));
  dispatch(addGame(gameObject));
  dispatch(updateGameLoading(false));
};

const gamesList = (state) => state.games.gameList;
const currentGame = (state) =>
  state.games.currentGame === null
    ? null
    : state.games.gameList[state.games.currentGame];

export const gamesSelectors = {
  gamesList,
  currentGame,
};

export default gamesSlice;
