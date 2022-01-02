import { Modal, Box, Button, Typography, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import {useState} from 'react';
import AddNewTask from './AddNewTask';

function GamePage(props) {

    let game = props.game;
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

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
                            {
                                array.map((task, index) => {
                                    return <p key={index}>{task.taskText}</p>
                                })
                            }
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
                    <AddNewTask addTask={props.addTask} index={props.index} closeModal={closeModal}/>
                </Modal>
            )}
            {taskAccordion(game.tasks, "Non-Time Based Tasks")}
            {taskAccordion(game.dailyTasks, "Daily Tasks")}
            {taskAccordion(game.weeklyTasks, "Weekly Tasks")}
        </>
    );
}

export default GamePage;