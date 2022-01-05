import { useState } from "react";
import { gamesSelectors } from "./slices/gamesSlice";
import { useSelector } from "react-redux";
import { RoundButton } from "./components/RoundButton";
import { useDispatch } from "react-redux";
import { setCurrentGame, addNewGame } from "./slices/gamesSlice";
import { VStack, Box } from '@chakra-ui/react'
import { EditGame } from "./components/EditGame";
import { Game } from "./models/game";

export const GameBar = () => {

  const dispatch = useDispatch();
  const gamesList = useSelector(gamesSelectors.gamesList);
  const newGame: Game = {
    name: "",
    id: 0,
    gameIconURL: "",
    hasDaily: false,
    hasWeekly: false,
    timezone: "",
    weeklyResetDOW: null,
    weeklyResetTime: "",
    dailyResetTime: "",
    nextDailyReset: null,
    nextWeeklyReset: null,
    tasks: [],
    dailyTasks: [],
    weeklyTasks: []
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openGameModal() {
    setIsModalOpen(true);
  }

  function addGame(gameData: Game) {
    setIsModalOpen(false);
    dispatch(addNewGame(gameData));
  }

  function changeCurrentGame(id: number) {
    dispatch(setCurrentGame(id))
  }

  return (
    <Box>
      <EditGame isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} gameData={newGame} addGame={addGame} />
      <VStack spacing="10%" align="center" >
        { 
          gamesList.map((game, index) => {
            return <RoundButton key={index} name={game.name} onClick={changeCurrentGame} imageURL={game.gameIconURL} />
          })
        }
        <RoundButton name="Add a Game" onClick={openGameModal} imageURL="" />
      </VStack>
    </Box>
  );
}