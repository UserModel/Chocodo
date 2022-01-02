import {useState} from 'react';
import React from 'react';
import GameBar from './GameBar';
import localStorageUtils from './LocalStorageUtils.js';
import { Modal, Box, Typography, Grid, Paper } from '@mui/material';
import AddNewGame from './components/AddNewGame';
import GamePage from './components/GamePage';

function Homepage() {
    const [userData, setUserData] = useState(localStorageUtils.getUserData());
    const [modalOpen, setModalOpen] = useState(false);
    const [activeGame, setActiveGame] = useState(-1);

    function addGame(gameData) {
        let newUserData = userData;
        newUserData.games.push(gameData);
        setUserData(newUserData);
        localStorageUtils.saveUserData(newUserData);
        setModalOpen(false);
        setActiveGame(newUserData.games.length - 1);
    }

    function addTask(gameIndex, taskData, taskType) {
        let newUserData = userData;
        if ( taskType === "Weekly" ) {
            newUserData.games[gameIndex].weeklyTasks.push(taskData);
        } else if ( taskType === "Daily" ) {
            newUserData.games[gameIndex].dailyTasks.push(taskData);
        } else {
            newUserData.games[gameIndex].tasks.push(taskData);
        }
        localStorageUtils.saveUserData(newUserData);
    }

    function changeActiveGame(newGame) {
        setActiveGame(newGame);
    }

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

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

    console.log(activeGame);

    return (
        <Box sx={{ width: '100%', height: '100%' }}>…
            {modalOpen && (
                <Modal
                    open={modalOpen}
                    onClose={closeModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add a New Game
                        </Typography>
                        <AddNewGame addGame={addGame} />
                    </Box>
                </Modal>
            )}

            <Grid container spacing={0} sx={{ width: '100%', height: '100%' }} >
                <Grid item xs={1}>
                    <GameBar games={userData.games} openModal={openModal} activeGame={activeGame} changeActiveGame={changeActiveGame} /> 
                </Grid>
                <Grid item xs={11} alignItems="center">
                    { activeGame >= 0 && userData.games.length > 0 && (
                        <Paper variant="outlined" style={{ width: '100%', height: '98%' }}>
                            <GamePage game={userData.games[activeGame]} addTask={addTask} index={activeGame} />
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default Homepage;