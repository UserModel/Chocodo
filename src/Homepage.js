import {useState} from 'react';
import React from 'react';
import GameBar from './GameBar';
import localStorageUtils from './LocalStorageUtils.js';
import { Modal, Box, Typography, Grid } from '@mui/material';
import AddNewGame from './components/AddNewGame';
import GamePage from './components/GamePage';

function Homepage() {
    const [userData, setUserData] = useState(localStorageUtils.getUserData());
    const [modalOpen, setModalOpen] = useState(false);
    const [activeGame, setActiveGame] = useState(0);

    function addGame(gameData) {
        let newUserData = userData;
        newUserData.games.push(gameData);
        setUserData(newUserData);
        localStorageUtils.saveUserData(newUserData);
        setModalOpen(false);
    }

    function changeActiveGame(newGame) {
        console.log(newGame);
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
                    { activeGame !== null && (
                        <GamePage game={userData.games[activeGame]} />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default Homepage;