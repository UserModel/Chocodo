import React from "react";
import { useState, useEffect } from "react";
import { gamesSelectors } from "./slices/gamesSlice";
import { useSelector } from "react-redux";
import { RoundButton } from "./components/RoundButton";
import { useDispatch } from "react-redux";
import { setCurrentGame, addNewGame } from "./slices/gamesSlice";
import { Modal, Stack, HStack, VStack, Button, Box } from '@chakra-ui/react'
import { EditGame } from "./components/EditGame";
import { Game } from "./models/game";

export const GameBar = () => {

  const dispatch = useDispatch();
  const gamesList = useSelector(gamesSelectors.gamesList);
  const newGame: Game = {
    name: "",
    id: Math.floor(Math.random() * Date.now()),
    gameIconURL: "",
    hasDaily: false,
    hasWeekly: false,
    timezone: "",
    weeklyResetDOW: null,
    weeklyResetTime: "",
    dailyResetTime: "",
    tasks: [],
    dailyTasks: [],
    weeklyTasks: []
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  function addGame() {
    setIsModalOpen(true);
  }

  function changeCurrentGame(id: number) {
    dispatch(setCurrentGame(id))
  }

  return (
    <>
      <EditGame isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} gameData={newGame} />
      <VStack spacing="15%">
        { 
          gamesList.map((game, index) => {
            return <RoundButton key={index} name={game.name} onClick={changeCurrentGame} imageURL="" />
          })
        }
        <RoundButton name="Add a Game" onClick={addGame} imageURL="" />
      </VStack>
    </>
  );
}