import React from 'react';
import {useState, useEffect} from 'react';
import localStorageUtils from '../LocalStorageUtils.js';
import { Button, Checkbox, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Task(props) {

    const [completed, setCompleted] = useState(props.task.completed);

    let task = props.task;
    let taskType = task.taskType;
    let gameIndex = props.gameIndex;
    let taskIndex = props.taskIndex;

    useEffect(() => {
        let newUserData = props.userData;
        if ( taskType === "Weekly" ) {
            newUserData.games[gameIndex].weeklyTasks[taskIndex].completed = completed;
        } else if ( taskType === "Daily" ) {
            newUserData.games[gameIndex].dailyTasks[taskIndex].completed = completed;
        } else {
            newUserData.games[gameIndex].tasks[taskIndex].completed = completed;
        }
        localStorageUtils.saveUserData(newUserData);
    }, [completed]);

    return (
        <Grid container spacing={0}>
            <Grid item xs={1}>
                <Checkbox style={{transform: "scale(0.75)"}} checked={completed} value={completed} onClick={() => setCompleted(!completed)} />
            </Grid>
            <Grid item xs={10}>
                { completed && 
                    <Typography style={{textDecoration: "line-through", color: "gray"}} variant="h5">{task.taskText}</Typography>
                }
                { !completed && 
                    <Typography variant="h5">{task.taskText}</Typography>
                }
            </Grid>
            <Grid item xs={1}>
                <Button>
                    <DeleteIcon onClick={() => props.deleteTask(taskIndex, taskType)} />
                </Button>
            </Grid>
        </Grid>
    )
}

export default Task;