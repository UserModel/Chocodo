import { DateTime } from 'luxon'

export const getNextDailyReset = (resetTime: string, timeZone: string) => {
    try {
        let [hour, minutes] = resetTime.split(':')
        const dateNow = DateTime.now().setZone(timeZone)
        const nextReset = dateNow
            .set({
                hour: Number(hour),
                minute: Number(minutes),
                second: 0,
                millisecond: 0,
            })
            .plus({ days: dateNow.hour < Number(hour) ? 0 : 1 })
        return nextReset.valueOf()
    } catch (e) {
        return null
    }
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
        const nextReset = dateNow
            .set({
                hour: Number(hour),
                minute: Number(minutes),
                second: 0,
                millisecond: 0,
            })
            .plus({ days: resetDOW - dateNow.weekday })
        return nextReset.valueOf()
    } catch (e) {
        return null
    }
}
