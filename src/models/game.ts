import { Task } from "./task";
import { ITimezone } from "react-timezone-select";
import { TimePickerValue } from "react-time-picker";

export type Game = {
    name: string,
    id: number,
    gameIconURL: string,
    hasWeekly: boolean,
    hasDaily: boolean,
    timezone: ITimezone,
    weeklyResetDOW: number | null,
    weeklyResetTime: string,
    nextWeeklyReset: string | null,
    dailyResetTime: string,
    nextDailyReset: string | null,
    tasks: Task[],
    dailyTasks: Task[],
    weeklyTasks: Task[]
}