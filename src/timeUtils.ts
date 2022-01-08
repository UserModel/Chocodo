import { DateTime } from 'luxon'

export const getNextDailyReset = (resetTime: string, timeZone: string) => {
    try {
        let [hour, minutes] = resetTime.split(':')
        const dateNow = DateTime.now().setZone(timeZone)
        const nextReset = dateNow.set({
            hour: Number(hour),
            minute: Number(minutes),
            second: 0,
            millisecond: 0,
        })
        let addDayReset = nextReset
        if (DateTime.now() > nextReset) {
            addDayReset = nextReset.plus({ days: 1 })
        }
        return addDayReset.valueOf()
    } catch (e) {
        return null
    }
}

export const getDateTimeWithTimezone = (
    resetTime: number,
    timeZone: string
) => {
    return DateTime.fromMillis(resetTime).setZone(timeZone).toJSDate()
}

export const getRemainingTime = (timeMilis: number) =>
    DateTime.fromMillis(timeMilis)
        .diff(DateTime.now(), ['days', 'hour', 'minute', 'second'])
        .toObject()

export const isDateInPast = (timeMilis: number) =>
    DateTime.fromMillis(timeMilis) < DateTime.now()

export const getNextWeeklyReset = (
    resetDOW: number,
    resetTime: string,
    timeZone: string
) => {
    try {
        let [hour, minutes] = resetTime.split(':')
        const dateNow = DateTime.now().setZone(timeZone)
        const nextReset = dateNow.set({
            weekday: resetDOW,
            hour: Number(hour),
            minute: Number(minutes),
            second: 0,
            millisecond: 0,
        })
        let addWeekReset = nextReset
        if (DateTime.now() > nextReset) {
            addWeekReset = nextReset.plus({ days: 7 })
        }
        return addWeekReset.valueOf()
    } catch (e) {
        return null
    }
}
