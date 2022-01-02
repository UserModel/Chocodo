import React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Button, Avatar, List, ListItemButton, ListItem, ListItemIcon } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function GameBar(props) {
    const [newActiveGame, setNewActiveGame] = useState(0);

    useEffect(() => {
        props.changeActiveGame(newActiveGame);
    }, [newActiveGame]);

    let gameList = props.games.map((game, index) => {
        return (
            <ListItem key={index} style={{padding: '0'}}>
                <ListItemButton onClick={() => setNewActiveGame(index)}>
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
        <ListItem sx={{padding: '0'}}>
            <ListItemButton onClick={props.openModal} >
                <Avatar>
                    <AddCircleIcon/>
                </Avatar>
            </ListItemButton>
        </ListItem>
    );  

    return (
        <List sx={{width: '100%', height: '100%', padding: '5px'}}>
            {gameList}
            {newGameModal}
        </List>
    );
}

export default GameBar;