import { Task } from './task'
import { Section } from './section'
import { ITimezone } from 'react-timezone-select'

export type Game = {
    name: string
    id: number
    gameIconURL: string
    hasWeekly: boolean
    hasDaily: boolean
    timezone: ITimezone
    weeklyResetDOW: number | null
    weeklyResetTime: string
    nextWeeklyReset: number | null
    dailyResetTime: string
    nextDailyReset: number | null
    tasks: Task[]
    sections: Section[]
}
