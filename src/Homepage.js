import {useState} from 'react';
import React from 'react';
import GameBar from './GameBar';
import localStorageUtils from './LocalStorageUtils.js';
import { Modal, Box, Typography } from '@mui/material';
import AddNewGame from './components/AddNewGame';

function Homepage() {
    const [userData, setUserData] = useState(localStorageUtils.getUserData());
    const [modalOpen, setModalOpen] = useState(false);

    function addGame(gameData) {
        let newUserData = userData;
        newUserData.games.push(gameData);
        setUserData(newUserData);
        localStorageUtils.saveUserData(newUserData);
        setModalOpen(false);
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
        <div>
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
            <GameBar games={userData.games} openModal={openModal} /> 
        </div>
    );
}

export default Homepage;