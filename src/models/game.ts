import { Task } from "./task";

export type Game = {
    name: string,
    id: number,
    gameIconURL: string,
    hasWeekly: boolean,
    hasDaily: boolean,
    weeklyResetDOW: number | null,
    weeklyResetTime: Date | null,
    dailyResetTime: Date | null,
    tasks: Task[],
    dailyTasks: Task[],
    weeklyTasks: Task[]
}