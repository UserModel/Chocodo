import { Game } from './game'

export type User = {
    currentGame: number,
    loading: boolean,
    gameList: Game[]
}