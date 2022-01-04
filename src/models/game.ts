import { Task } from "./task";

export type Game = {
    name: string,
    id: number,
    gameIconURL: string,
    hasWeekly: boolean,
    hasDaily: boolean,
    timezone: string | null,
    weeklyResetDOW: number | null,
    weeklyResetTime: string | null,
    nextWeeklyReset: string | null,
    dailyResetTime: string | null,
    nextDailyReset: string | null,
    tasks: Task[],
    dailyTasks: Task[],
    weeklyTasks: Task[]
}