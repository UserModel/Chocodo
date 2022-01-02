import { List, ListItem, Modal, Box, Button, Typography, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
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
            newUserData.games[props.index].weeklyTasks.splice(taskIndex);
        } else if ( taskType === "Daily" ) {
            newUserData.games[props.index].dailyTasks.splice(taskIndex);
        } else {
            newUserData.games[props.index].tasks.splice(taskIndex);
        }
        localStorageUtils.saveUserData(newUserData);
    }

    const taskAccordion = (array, name) => {
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
                                <ListItem>
                                    <p>Uncompleted Tasks</p>
                                </ListItem>
                                {
                                    array.map((task, index) => {
                                        if ( !task.completed ) {
                                            return (
                                                <ListItem item sx={12}>
                                                    <Task task={task} key={index} taskIndex={index} gameIndex={props.index} userData={props.userData} deleteTask={deleteTask} />
                                                </ListItem>
                                            )
                                        }
                                        return;
                                    })
                                }
                                <ListItem>
                                    <p>Completed Tasks</p>
                                </ListItem>
                                {
                                    array.map((task, index) => {
                                        if ( task.completed ) {
                                            return (
                                                <ListItem item sx={12}>
                                                    <Task task={task} key={index} taskIndex={index} gameIndex={props.index} userData={props.userData} />
                                                </ListItem>
                                            )
                                        }
                                        return;
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
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <AddNewTask addTask={addTask} index={props.index} closeModal={closeModal}/>
                </Modal>
            )}
            {taskAccordion(game.tasks, "Non-Time Based Tasks")}
            {taskAccordion(game.dailyTasks, "Daily Tasks")}
            {taskAccordion(game.weeklyTasks, "Weekly Tasks")}
        </>
    );
}

export default GamePage;