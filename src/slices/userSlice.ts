/* eslint-disable no-param-reassign */
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { Game } from "../models/game";
import { Section } from "../models/section";
import { RootState } from "../store";

/**
 * The initial state of the GamesSlice
 */
const initialState: User = {
  currentGame: 0,
  loading: false,
  gameList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserLoading(state, action: PayloadAction<boolean>) {
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
      console.log(state.gameList.map((game) =>
        game.id === action.payload.id ? action.payload : game
      ));
      state.gameList = state.gameList.map((game) =>
        game.id === action.payload.id ? action.payload : game
      );
    },
  },
});

export const {
  updateUserLoading,
  updateCurrentGame,
  addGame,
  deleteGame,
  updateGame
} = userSlice.actions;

// Thunk to add new game
export const addNewGame =
  (gameObject: Game) => async (dispatch: Dispatch<any>) => {
    dispatch(updateUserLoading(true));
    dispatch(addGame(gameObject));
    dispatch(updateUserLoading(false));
  };

export const editGame = 
  (gameObject: Game) => async (dispatch: Dispatch<any>) => {
    dispatch(updateUserLoading(true));
    dispatch(updateGame(gameObject));
    dispatch(updateUserLoading(false));
  }

export const setCurrentGame =
  (id: number) => async (dispatch: Dispatch<any>) => {
    dispatch(updateUserLoading(true));
    dispatch(updateCurrentGame(id));
    dispatch(updateUserLoading(false));
  };

const gamesList = (state: RootState) => state.user.gameList;
const currentGame = (state: RootState) => 
  state.user.currentGame === null
    ? null
    : state.user.gameList.filter(game => {
      return game.id === state.user.currentGame
    })[0];

export const userSelectors = {
  gamesList,
  currentGame,
};

export default userSlice;
