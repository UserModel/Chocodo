import { ITimezone } from 'react-timezone-select'
import moment from 'moment-timezone';

export const setNextDailyReset = (resetTime: String | null, timezone: ITimezone) => {
    if ( resetTime !== null ) {
        let nextReset = moment().utcOffset(0);
        let times = resetTime.split(":");
        nextReset.set({
            hour: parseInt(times[0]),
            minutes: parseInt(times[1]),
            seconds: 0,
            millisecond: 0
        });
        nextReset.tz(timezone.toString());
        if ( moment().isAfter(nextReset) ) {
            nextReset.add(1, "d");
        }
        return nextReset.valueOf();
    } 
    return null;
} 