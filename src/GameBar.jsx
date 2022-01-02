import React from "react";
import { useState, useEffect } from "react";
import { Avatar, List, ListItemButton, ListItem } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { gamesSelectors } from "./slices/gamesSlice";
import { useSelector } from "react-redux";

function GameBar(props) {
  const gamesList = useSelector(gamesSelectors.gamesList);

  const [newActiveGame, setNewActiveGame] = useState(0);

  useEffect(() => {
    props.changeActiveGame(newActiveGame);
  }, [newActiveGame]);

  let gameComponents = gamesList.map((game, index) => {
    return (
      <ListItem key={index} style={{ padding: "0" }}>
        <ListItemButton onClick={() => setNewActiveGame(index)}>
          {game.gameIconUrl !== "" && (
            <Avatar alt={game.name} src={game.gameIconURL} />
          )}
          {game.gameIconUrl === "" && <Avatar>{game.name.charAt(0)}</Avatar>}
        </ListItemButton>
      </ListItem>
    );
  });

  let newGameModal = (
    <ListItem sx={{ padding: "0" }}>
      <ListItemButton onClick={props.openModal}>
        <Avatar>
          <AddCircleIcon />
        </Avatar>
      </ListItemButton>
    </ListItem>
  );

  return (
    <List sx={{ width: "100%", height: "100%", padding: "5px" }}>
      {gameComponents}
      {newGameModal}
    </List>
  );
}

export default GameBar;
