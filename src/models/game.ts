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
    nextWeeklyReset: string | null
    dailyResetTime: string
    nextDailyReset: string | null
    tasks: Task[]
    sections: Section[]
}
