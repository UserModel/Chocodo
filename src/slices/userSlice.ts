/* eslint-disable no-param-reassign */
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../models/user'
import { Game } from '../models/game'
import { Section } from '../models/section'
import { RootState } from '../store'
import { Task, TaskType } from '../models/task'

/**
 * The initial state of the GamesSlice
 */
const initialState: User = {
    currentGame: 0,
    loading: false,
    gameList: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        updateCurrentGame(state, action: PayloadAction<number>) {
            state.currentGame = action.payload
        },
        addGame(state, action: PayloadAction<Game>) {
            state.gameList = [...state.gameList, action.payload]
        },
        deleteGame(state, action: PayloadAction<number>) {
            state.gameList = state.gameList.filter(
                (game) => game.id !== action.payload
            )
        },
        updateGame(state, action: PayloadAction<Game>) {
            state.gameList = state.gameList.map((game) =>
                game.id === action.payload.id ? action.payload : game
            )
        },
    },
})

export const {
    updateUserLoading,
    updateCurrentGame,
    addGame,
    deleteGame,
    updateGame,
} = userSlice.actions

// Thunk to add new game
export const addNewGame =
    (gameObject: Game) => async (dispatch: Dispatch<any>) => {
        dispatch(updateUserLoading(true))
        dispatch(addGame(gameObject))
        dispatch(updateUserLoading(false))
    }

export const editGame =
    (gameObject: Game) => async (dispatch: Dispatch<any>) => {
        dispatch(updateUserLoading(true))
        dispatch(updateGame(gameObject))
        dispatch(updateUserLoading(false))
    }
export const editGameById =
    (gameId: number, gameObject: Partial<Game>) =>
    async (dispatch: Dispatch<any>, getState: () => RootState) => {
        dispatch(updateUserLoading(true))
        const game = getState().user.gameList.find((game) => game.id === gameId)
        if (game) {
            dispatch(updateGame({ ...game, ...gameObject }))
        }
        dispatch(updateUserLoading(false))
    }

export const removeGame =
    (gameId: number) => async (dispatch: Dispatch<any>) => {
        dispatch(updateUserLoading(true))
        dispatch(deleteGame(gameId))
        dispatch(updateUserLoading(false))
    }

export const setCurrentGame =
    (id: number) => async (dispatch: Dispatch<any>) => {
        dispatch(updateUserLoading(true))
        dispatch(updateCurrentGame(id))
        dispatch(updateUserLoading(false))
    }

export const addSection =
    (gameId: number, sectionObject: Section) =>
    async (dispatch: Dispatch<any>, getState: () => RootState) => {
        dispatch(updateUserLoading(true))
        const game = getState().user.gameList.find((game) => game.id === gameId)
        if (game) {
            dispatch(
                updateGame({
                    ...game,
                    sections: [...game.sections, sectionObject],
                })
            )
        }
        dispatch(updateUserLoading(false))
    }

export const deleteSection =
    (gameId: number, sectionId: number) =>
    async (dispatch: Dispatch<any>, getState: () => RootState) => {
        dispatch(updateUserLoading(true))
        const game = getState().user.gameList.find((game) => game.id === gameId)
        if (game) {
            dispatch(
                updateGame({
                    ...game,
                    sections: game.sections.filter(
                        (section) => section.id !== sectionId
                    ),
                })
            )
        }
        dispatch(updateUserLoading(false))
    }

export const editSection =
    (gameId: number, sectionObject: Section) =>
    async (dispatch: Dispatch<any>, getState: () => RootState) => {
        dispatch(updateUserLoading(true))
        const game = getState().user.gameList.find((game) => game.id === gameId)
        if (game) {
            dispatch(
                updateGame({
                    ...game,
                    sections: game.sections.map((section) =>
                        section.id === sectionObject.id
                            ? sectionObject
                            : section
                    ),
                })
            )
        }
        dispatch(updateUserLoading(false))
    }

export const addTask =
    (gameId: number, taskObject: Task) =>
    async (dispatch: Dispatch<any>, getState: () => RootState) => {
        dispatch(updateUserLoading(true))
        const game = getState().user.gameList.find((game) => game.id === gameId)
        if (game) {
            dispatch(
                updateGame({
                    ...game,
                    tasks: [...game.tasks, taskObject],
                })
            )
        }
        dispatch(updateUserLoading(false))
    }

export const deleteTask =
    (gameId: number, taskId: number) =>
    async (dispatch: Dispatch<any>, getState: () => RootState) => {
        dispatch(updateUserLoading(true))
        const game = getState().user.gameList.find((game) => game.id === gameId)
        if (game) {
            dispatch(
                updateGame({
                    ...game,
                    tasks: game.tasks.filter((task) => task.id !== taskId),
                })
            )
        }
        dispatch(updateUserLoading(false))
    }

export const editTask =
    (gameId: number, taskObject: Task) =>
    async (dispatch: Dispatch<any>, getState: () => RootState) => {
        dispatch(updateUserLoading(true))
        const game = getState().user.gameList.find((game) => game.id === gameId)
        if (game) {
            dispatch(
                updateGame({
                    ...game,
                    tasks: game.tasks.map((task) =>
                        task.id === taskObject.id ? taskObject : task
                    ),
                })
            )
        }
        dispatch(updateUserLoading(false))
    }

export const deleteAllTasksFromSection =
    (gameId: number, sectionId: number) =>
    async (dispatch: Dispatch<any>, getState: () => RootState) => {
        dispatch(updateUserLoading(true))
        const game = getState().user.gameList.find((game) => game.id === gameId)
        if (game) {
            dispatch(
                updateGame({
                    ...game,
                    tasks: game.tasks.filter(
                        (task) => task.sectionId !== sectionId
                    ),
                })
            )
        }
        dispatch(updateUserLoading(false))
    }

export const toggleTasksFromReset =
    (gameId: number, taskType: TaskType) =>
    async (dispatch: Dispatch<any>, getState: () => RootState) => {
        dispatch(updateUserLoading(true))
        const game = getState().user.gameList.find((game) => game.id === gameId)
        if (game) {
            dispatch(
                updateGame({
                    ...game,
                    tasks: game.tasks.map((task) =>
                        task.taskType === taskType
                            ? { ...task, completed: false }
                            : task
                    ),
                })
            )
        }
        dispatch(updateUserLoading(false))
    }

export const toggleCompletedTask =
    (gameId: number, taskId: number) =>
    async (dispatch: Dispatch<any>, getState: () => RootState) => {
        dispatch(updateUserLoading(true))
        const game = getState().user.gameList.find((game) => game.id === gameId)
        if (game) {
            dispatch(
                updateGame({
                    ...game,
                    tasks: game.tasks.map((task) =>
                        task.id === taskId
                            ? { ...task, completed: !task.completed }
                            : task
                    ),
                })
            )
        }
        dispatch(updateUserLoading(false))
    }

const gamesList = (state: RootState) => state.user.gameList
const currentGame = (state: RootState) =>
    state.user.currentGame === null
        ? null
        : state.user.gameList.filter((game) => {
              return game.id === state.user.currentGame
          })[0]

const tasks = (state: RootState, gameId: number, taskType: TaskType) =>
    state.user.gameList
        .find((game) => game.id === gameId)
        ?.tasks.filter((task) => task.taskType === taskType)

const section = (state: RootState, gameId: number, sectionId: number) =>
    state.user.gameList
        .find((game) => game.id === gameId)
        ?.sections.find((section) => section.id === sectionId)

export const userSelectors = {
    gamesList,
    currentGame,
    tasks,
    section,
}

export default userSlice
