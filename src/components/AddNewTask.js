import { FormControl, ToggleButton, ToggleButtonGroup, Box, Button, Typography, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';

function AddNewTask(props) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [typeOfTask, setTypeOfTask] = useState("");
    const [taskText, setTaskText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const submitTask = () => {
        if ( taskText !== "" ) {
            let newTask = {
                taskText: taskText,
                completed: false
            }
            props.addTask(newTask, typeOfTask);
            setTypeOfTask("");
            setTaskText("");
            props.closeModal();
        } else {
            setErrorMessage("Must enter a game title.");
        }
    }

    return (
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Add a New Task
            </Typography>
            { errorMessage !== "" && (
                <p style={{"color": "red"}}>{errorMessage}</p>
            ) }

            {/* Type of Task */}
            <FormControl fullWidth>
                <ToggleButtonGroup
                    value={typeOfTask}
                    exclusive
                    onChange={(event, value) => setTypeOfTask(value)}
                    aria-label="text alignment"
                >
                    <ToggleButton value="Normal" aria-label="left aligned">
                        Normal
                    </ToggleButton>
                    <ToggleButton value="Daily" aria-label="centered">
                        Daily
                    </ToggleButton>
                    <ToggleButton value="Weekly" aria-label="right aligned">
                        Weekly
                    </ToggleButton>
                </ToggleButtonGroup>   
            </FormControl>

            {/* Task Text */}
            <FormControl fullWidth>
                <TextField 
                    onChange={(event) => setTaskText(event.target.value)} 
                    value={taskText} 
                    required 
                    label="Task Text" 
                    variant="outlined" 
                />
            </FormControl>

            <Button variant="contained" onClick={submitTask}>Submit</Button>
        </Box>
    );
}

export default AddNewTask;