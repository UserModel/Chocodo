import { Task } from "./task";

export type Game = {
    name: string,
    id: number,
    gameIconURL: string,
    hasWeekly: boolean,
    hasDaily: boolean,
    timezone: string,
    weeklyResetDOW: number | null,
    weeklyResetTime: string | null,
    dailyResetTime: string | null,
    tasks: Task[],
    dailyTasks: Task[],
    weeklyTasks: Task[]
}