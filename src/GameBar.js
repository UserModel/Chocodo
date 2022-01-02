import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

function GameBar(props) {

    let gameList = props.games.map((game) =>
        <p>game.name</p>
    );

    let newGameModal = (
        <Button variant="contained" onClick={props.openModal}>Add Game</Button>
    );

    return (
        <div>
            {gameList}
            {newGameModal}
        </div>
    );
}

export default GameBar;