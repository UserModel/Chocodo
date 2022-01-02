import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Select, MenuItem, FormControl, InputLabel, Menu, Button } from '@mui/material';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment-timezone';

function AddNewGame(props) {

    const [gameTitle, setGameTitle] = useState("");
    const [gameIconURL, setGameIconURL] = useState("");
    const [dailyResetTime, setDailyResetTime] = useState(null);
    const [weeklyResetTime, setWeeklyResetTime] = useState(null);
    const [timezone, setTimeZone] = useState("");
    const [weeklyDOW, setWeeklyDOW] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    /*
        Game Title
        Image URL
        Timezone
        Weekly Day
        Weekly Reset Time
        Weekly Reset Clear
        Daily Reset Time
        Daily Reset Clear
    */

    const handleTimeZoneChange = (event) => {setTimeZone(event.target.value);};
    const handleWeeklyDOWChange = (event) => {setWeeklyDOW(event.target.value);};

    const submitGame = () => {
        if ( gameTitle !== "" ) {
            let newGame = {
                name: gameTitle,
                gameIconURL: gameIconURL,
                timezone: timezone,
                weeklyResetDOW: weeklyDOW,
                weeklyResetTime: weeklyResetTime,
                dailyResetTime: dailyResetTime
            }
            props.addGame(newGame);
            setGameTitle("");
            setGameIconURL("");
            setDailyResetTime(null);
            setWeeklyResetTime(null);
            setTimeZone("");
            setWeeklyDOW("");
        } else {
            setErrorMessage("Must enter a game title.");
        }
    }

    return (
        <Box>
            {/* Error Message */}
            { errorMessage !== "" && (
                <p style={{"color": "red"}}>{errorMessage}</p>
            ) }

            {/* Game Title */}
            <FormControl fullWidth>
                <TextField 
                    onChange={(event) => setGameTitle(event.target.value)} 
                    value={gameTitle} 
                    required 
                    id="outlined-basic" 
                    label="Game Title" 
                    variant="outlined" 
                />
            </FormControl>

            {/* Game Icon */}
            <FormControl fullWidth>
                <TextField 
                    onChange={(event) => setGameIconURL(event.target.value)} 
                    value={gameIconURL} 
                    id="outlined-basic" 
                    label="Icon URL" 
                    variant="outlined" 
                />
            </FormControl>

            {/* Display Game Icon */}
            { gameIconURL.match(/\.(jpeg|jpg|gif|png)$/) != null && (
                <img src={gameIconURL} />
            )}

            {/* Timezone Select */}
            <FormControl fullWidth>
                <InputLabel id="timezone-label">Timezone</InputLabel>
                <Select
                    labelId="timezone-label"
                    id="timezone-select"
                    value={timezone}
                    label="Timezone"
                    onChange={handleTimeZoneChange}
                >
                    {moment.tz.names().map((timezone, i) => <MenuItem value={timezone} key={i}>{timezone}</MenuItem>)}
                </Select>
            </FormControl>
            
            {/* Weekly Reset Day of Week */}
            <FormControl fullWidth>
                <InputLabel id="weekly-day-of-week">Weekly Reset Day</InputLabel>
                <Select
                    labelId="weekly-day-of-week"
                    id="weekly-day-select"
                    value={weeklyDOW}
                    label="Weekly Reset Day"
                    onChange={handleWeeklyDOWChange}
                >
                    <MenuItem value="0" key="0">Sunday</MenuItem>
                    <MenuItem value="1" key="1">Monday</MenuItem>
                    <MenuItem value="2" key="2">Tuesday</MenuItem>
                    <MenuItem value="3" key="3">Wednesday</MenuItem>
                    <MenuItem value="4" key="4">Thursday</MenuItem>
                    <MenuItem value="5" key="5">Friday</MenuItem>
                    <MenuItem value="6" key="6">Saturday</MenuItem>
                </Select>
            </FormControl>

            {/* Weekly Reset Time */}
            <FormControl fullWidth>
                <TimePicker
                    label="Weekly Reset Time"
                    value={weeklyResetTime}
                    onChange={(newValue) => {
                        setWeeklyResetTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </FormControl>

            {/* Daily Reset Time */}
            <FormControl fullWidth>
                <TimePicker
                    label="Daily Reset Time"
                    value={dailyResetTime}
                    onChange={(newValue) => {
                        setDailyResetTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </FormControl>

            <Button variant="contained" onClick={submitGame}>Submit</Button>
        </Box>
    );
}

export default AddNewGame;