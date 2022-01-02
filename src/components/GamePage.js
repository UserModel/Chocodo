import { List, ListItem, Modal, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import {useState, useEffect} from 'react';
import AddNewTask from './AddNewTask';
import localStorageUtils from '../LocalStorageUtils.js';
import Task from './Task';

function GamePage(props) {
    
    const [game, setGame] = useState(props.game);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        setGame(props.userData.games[props.index]);
    }, [props.userData]);

    function addTask(taskData, taskType) {
        let newUserData = props.userData;
        if ( taskType === "Weekly" ) {
            newUserData.games[props.index].weeklyTasks.push(taskData);
        } else if ( taskType === "Daily" ) {
            newUserData.games[props.index].dailyTasks.push(taskData);
        } else {
            newUserData.games[props.index].tasks.push(taskData);
        }
        localStorageUtils.saveUserData(newUserData);
    }

    function deleteTask(taskIndex, taskType) {
        let newUserData = props.userData;
        if ( taskType === "Weekly" ) {
            newUserData.games[props.index].weeklyTasks.splice(taskIndex, 1);
        } else if ( taskType === "Daily" ) {
            newUserData.games[props.index].dailyTasks.splice(taskIndex, 1);
        } else {
            newUserData.games[props.index].tasks.splice(taskIndex, 1);
        }
        localStorageUtils.saveUserData(newUserData);
    }

    const taskLine = (task, index, taskType) => {
        return (
            <ListItem item key={index}>
                <Task taskType={taskType} task={task} taskIndex={index} gameIndex={props.index} userData={props.userData} deleteTask={deleteTask} />
            </ListItem>
        )
    }

    const taskAccordion = (array, name, taskType) => {
        if ( array.length > 0 ) {
            return (
                <>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List dense={true}>
                                {
                                    array.map((task, index) => {
                                        if ( task.completed.toString() === "false" ) {
                                            return (
                                                taskLine(task, index, taskType)
                                            )
                                        }
                                        return null;
                                    })
                                }
                                {
                                    array.map((task, index) => {
                                        if ( task.completed.toString() === "true" ) {
                                            return (
                                                taskLine(task, index, taskType)
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </List>
                        </AccordionDetails>
                    </Accordion>
                </>
            )
        }
        return null;
    }

    return (
        <>
            <Typography variant="h4" gutterBottom component="div">
                {game.name}
            </Typography>
            <Button onClick={openModal}>New Task</Button>
            {modalOpen && (
                <Modal
                    open={modalOpen}
                    onClose={closeModal}
                >
                    <AddNewTask addTask={addTask} index={props.index} closeModal={closeModal}/>
                </Modal>
            )}
            {taskAccordion(game.tasks, "Non-Time Based Tasks", "Normal")}
            {taskAccordion(game.dailyTasks, "Daily Tasks", "Daily")}
            {taskAccordion(game.weeklyTasks, "Weekly Tasks", "Weekly")}
        </>
    );
}

export default GamePage;