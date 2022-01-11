import { useState } from 'react'
import { userSelectors } from '../slices/userSlice'
import { useSelector } from 'react-redux'
import { RoundButton } from '../components/RoundButton'
import { useDispatch } from 'react-redux'
import { setCurrentGame, addNewGame } from '../slices/userSlice'
import { VStack, Box, Divider } from '@chakra-ui/react'
import { EditGame } from '../components/EditGame'
import { Game } from '../models/game'
import { TaskType } from '../models/task'

export const GameBar = () => {
    const dispatch = useDispatch()
    const gamesList = useSelector(userSelectors.gamesList)
    const newGame: Game = {
        name: '',
        id: 0,
        gameIconURL: '',
        hasDaily: false,
        hasWeekly: false,
        timezone: '',
        weeklyResetDOW: null,
        weeklyResetTime: '',
        dailyResetTime: '',
        nextDailyReset: null,
        nextWeeklyReset: null,
        tasks: [],
        sections: [
            {
                sectionName: 'General Tasks',
                taskType: TaskType.NORMAL,
                id: Math.floor(Math.random() * Date.now()),
            },
            {
                sectionName: 'General Daily Tasks',
                taskType: TaskType.DAILY,
                id: Math.floor(Math.random() * Date.now()),
            },
            {
                sectionName: 'General Weekly Tasks',
                taskType: TaskType.WEEKLY,
                id: Math.floor(Math.random() * Date.now()),
            },
        ],
        currentSection: undefined
    }

    const [isModalOpen, setIsModalOpen] = useState(false)

    function openGameModal() {
        setIsModalOpen(true)
    }

    function addGame(gameData: Game) {
        setIsModalOpen(false)
        dispatch(addNewGame(gameData))
        dispatch(setCurrentGame(gameData.id))
    }

    function changeCurrentGame(id: number) {
        dispatch(setCurrentGame(id))
    }

    return (
        <Box>
            <EditGame
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                gameData={newGame}
                addGame={addGame}
            />
            <VStack spacing="10%" align="center">
                <RoundButton
                    name="Home"
                    onClick={changeCurrentGame}
                    imageURL=""
                    gameId={0}
                />
                <Divider w="50%" colorScheme="black" />
                {gamesList.map((game, index) => {
                    return (
                        <RoundButton
                            key={index}
                            name={game.name}
                            gameId={game.id}
                            onClick={changeCurrentGame}
                            imageURL={game.gameIconURL}
                        />
                    )
                })}
                <RoundButton
                    name="Add a Game"
                    onClick={openGameModal}
                    imageURL=""
                    gameId={0}
                />
            </VStack>
        </Box>
    )
}
