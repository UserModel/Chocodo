import { Box, Flex, VStack, Spacer, Heading } from '@chakra-ui/layout'
import { Button, IconButton } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronRightIcon, AddIcon, SettingsIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { addSection, userSelectors } from './slices/userSlice'
import { InformationPanel } from './InformationPanel'
import { TaskType } from './models/task'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { EditSection } from './components/EditSection'
import { Section } from './models/section'
import { EditGame } from './components/EditGame';
import { Game } from './models/game';
import { TaskPanel } from './TaskPanel'

export const GamePanel = () => {
    const currentGame = useSelector(userSelectors.currentGame);
    const dispatch = useDispatch();
    const [generalTasksOpen, setGeneralTasksOpen] = useState(true);
    const [dailyTasksOpen, setDailyTasksOpen] = useState(true);
    const [weeklyTasksOpen, setWeeklyTasksOpen] = useState(true);
    const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState(0);
    const [editGameModal, setEditGameModal] = useState(false);

    useEffect(() => {
        console.log(selectedSection);
    }, [selectedSection])

    useEffect(() => {
        setGeneralTasksOpen(true)
        setDailyTasksOpen(true)
        setWeeklyTasksOpen(true)
    }, [currentGame])

    const newSection: Section = {
        sectionName: '',
        taskType: null,
        id: 0,
    }

    const addNewSection = (sectionObject: Section) => {
        setIsNewSectionModalOpen(false)
        if (currentGame) {
            dispatch(addSection(currentGame.id, sectionObject))
        }
    }

    const editGame = (gameData: Game) => {
        setEditGameModal(false);
        console.log(gameData);
        dispatch(editGame(gameData));
    }

    return (
        <Box
            width="100%"
            height="100%"
            bgColor="#36393E"
            borderTopLeftRadius="15px"
        >
            {isNewSectionModalOpen && (
                <EditSection
                    section={newSection}
                    gameData={currentGame}
                    isModalOpen={isNewSectionModalOpen}
                    closeModal={() => setIsNewSectionModalOpen(false)}
                    onClick={addNewSection}
                />
            )}
            {(currentGame === undefined || currentGame === null) && (
                <InformationPanel />
            )}
            {currentGame !== undefined && currentGame !== null && (
                <VStack h="100%" spacing={0}>
                    { editGameModal && (<EditGame isModalOpen={editGameModal} onClose={() => setEditGameModal(false)} gameData={currentGame} addGame={editGame} />)  }
                    <Flex w="100%" h="8%" borderBottom="1px" borderColor="#232428">
                        <Heading paddingTop="0.7%" paddingLeft="1.5%">
                            {currentGame.name}
                        </Heading>
                        <Spacer />
                        <VStack paddingRight="1.5%" paddingTop="0.7%" h="100%">
                            <Heading size="xs">Time until daily reset</Heading>
                            <Heading size="xs">Time until weekly reset</Heading>
                        </VStack>
                        <SettingsIcon onClick={() => setEditGameModal(true)} className='show-click' h="100%" w="3.5%" marginLeft="3%" paddingTop="0.0%" paddingRight="1.5%" />
                    </Flex>
                    <Flex w="100%" h="92%" bgColor="#36393E">
                        <VStack
                            align="center"
                            bgColor="#2E3136"
                            w="20%"
                            h="100%"
                            borderRight="0px"
                        >
                            <Flex
                                padding="5%"
                                align="center"
                                w="100%"
                                h="5%"
                                bgColor="black"
                            >
                                <Heading size="xs">Sections</Heading>
                                <Spacer />
                                <IconButton
                                    size="xs"
                                    onClick={() =>
                                        setIsNewSectionModalOpen(true)
                                    }
                                    aria-label="Search database"
                                    icon={<AddIcon color="blue" />}
                                />
                            </Flex>
                            <VStack w="100%" spacing={0}>
                                <Button
                                    w="100%"
                                    className="dropdown"
                                    onClick={() =>
                                        setGeneralTasksOpen(!generalTasksOpen)
                                    }
                                    leftIcon={
                                        generalTasksOpen ? (
                                            <ChevronDownIcon />
                                        ) : (
                                            <ChevronRightIcon />
                                        )
                                    }
                                    colorScheme="white"
                                    variant="ghost"
                                >
                                    General Tasks Sections
                                </Button>
                                {generalTasksOpen &&
                                    currentGame.sections
                                        .filter(
                                            (section) =>
                                                section.taskType ===
                                                TaskType.NORMAL
                                        )
                                        .map((section, index) => (
                                            <Button onClick={() => setSelectedSection(section.id)} colorScheme="black" key={index} size="sm">
                                                {section.sectionName}
                                            </Button>
                                        ))}
                            </VStack>
                            {currentGame.hasDaily && (
                                <VStack w="100%" spacing={0}>
                                    <Button
                                        w="100%"
                                        className="dropdown"
                                        onClick={() =>
                                            setDailyTasksOpen(!dailyTasksOpen)
                                        }
                                        leftIcon={
                                            dailyTasksOpen ? (
                                                <ChevronDownIcon />
                                            ) : (
                                                <ChevronRightIcon />
                                            )
                                        }
                                        colorScheme="white"
                                        variant="ghost"
                                    >
                                        Daily Tasks Sections
                                    </Button>
                                    {dailyTasksOpen &&
                                        currentGame.sections
                                            .filter(
                                                (section) =>
                                                    section.taskType ===
                                                    TaskType.DAILY
                                            )
                                            .map((section, index) => (
                                                <Button onClick={() => setSelectedSection(section.id)} colorScheme="black" key={index} size="sm">
                                                    {section.sectionName}
                                                </Button>
                                            ))}
                                </VStack>
                            )}
                            {currentGame.hasWeekly && (
                                <VStack w="100%" spacing={0}>
                                    <Button
                                        w="100%"
                                        className="dropdown"
                                        onClick={() =>
                                            setWeeklyTasksOpen(!weeklyTasksOpen)
                                        }
                                        leftIcon={
                                            weeklyTasksOpen ? (
                                                <ChevronDownIcon />
                                            ) : (
                                                <ChevronRightIcon />
                                            )
                                        }
                                        colorScheme="white"
                                        variant="ghost"
                                    >
                                        Weekly Tasks Sections
                                    </Button>
                                    {weeklyTasksOpen &&
                                        currentGame.sections
                                            .filter(
                                                (section) =>
                                                    section.taskType ===
                                                    TaskType.WEEKLY
                                            )
                                            .map((section, index) => (
                                                <Button onClick={() => setSelectedSection(section.id)} colorScheme="black" key={index} size="sm">
                                                    {section.sectionName}
                                                </Button>
                                            ))}
                                </VStack>
                            )}
                            <Spacer />
                        </VStack>
                        <Box
                            align="center"
                            w="80%"
                            h="100%"
                        >
                            <TaskPanel gameData={currentGame} sectionId={selectedSection} />
                        </Box>
                    </Flex>
                </VStack>
            )}
        </Box>
    )
}
