import React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Button, Avatar, List, ListItemButton, ListItem, ListItemIcon } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function GameBar(props) {
    const [newActiveGame, setNewActiveGame] = useState(0);

    useEffect(() => {
        props.changeActiveGame(newActiveGame);
    }, newActiveGame);

    let gameList = props.games.map((game, index) => {
        return (
            <ListItem key={index}>
                <ListItemButton onClick={setNewActiveGame(index)}>
                    { game.gameIconUrl !== "" && (
                        <Avatar alt={game.name} src={game.gameIconURL} />
                    ) }
                    { game.gameIconUrl === "" && (
                        <Avatar>{game.name.charAt(0)}</Avatar>
                    ) }
                </ListItemButton>
            </ListItem>
        );
    });

    let newGameModal = (
        <ListItem>
            <ListItemButton>
                <Avatar>
                    <AddCircleIcon onClick={props.openModal} />
                </Avatar>
            </ListItemButton>
        </ListItem>
    );  

    return (
        <List>
            {gameList}
            {newGameModal}
        </List>
    );
}

export default GameBar;