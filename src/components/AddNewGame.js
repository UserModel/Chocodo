import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import { TextField, Box } from '@mui/material';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment-timezone';

function AddNewGame() {

    const [gameTitle, setGameTitle] = useState("");
    const [gameIconURL, setGameIconURL] = useState("");
    const [dailyResetTime, setDailyResetTime] = useState(null);

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

    console.log(moment.tz.zonesForCountry('US', false));

    return (
        <Box>
            // Game Title
            <TextField 
                onChange={(event) => setGameTitle(event.target.value)} 
                value={gameTitle} 
                required 
                id="outlined-basic" 
                label="Game Title" 
                variant="outlined" 
            />
            // Game Icon
            <TextField 
                onChange={(event) => setGameIconURL(event.target.value)} 
                value={gameIconURL} 
                id="outlined-basic" 
                label="Icon URL" 
                variant="outlined" 
            />
            // Display Game Icon
            { gameIconURL.match(/\.(jpeg|jpg|gif|png)$/) != null && (
                <img src={gameIconURL} />
            )}
            
            <TimePicker
                label="Daily Reset Time"
                value={dailyResetTime}
                onChange={(newValue) => {
                    setDailyResetTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </Box>
    );
}

export default AddNewGame;