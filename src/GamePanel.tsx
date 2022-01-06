import { Box, Flex, VStack, Spacer, Heading } from '@chakra-ui/layout'
import { Button, IconButton } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronRightIcon, AddIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { addSection, userSelectors } from './slices/userSlice'
import { InformationPanel } from './InformationPanel'
import { TaskType } from './models/task'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { EditSection } from './components/EditSection'
import { Section } from './models/section'

export const GamePanel = () => {
    const currentGame = useSelector(userSelectors.currentGame)
    const dispatch = useDispatch()
    const [generalTasksOpen, setGeneralTasksOpen] = useState(true)
    const [dailyTasksOpen, setDailyTasksOpen] = useState(true)
    const [weeklyTasksOpen, setWeeklyTasksOpen] = useState(true)
    const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState(false)

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
                    <Flex w="100%" h="8%" borderBottom="1px">
                        <Heading paddingTop="0.7%" paddingLeft="1.5%">
                            {currentGame.name}
                        </Heading>
                        <Spacer />
                        <VStack paddingRight="1.5%" paddingTop="0.7%" h="100%">
                            <Heading size="xs">Time until daily reset</Heading>
                            <Heading size="xs">Time until weekly reset</Heading>
                        </VStack>
                    </Flex>
                    <Flex w="100%" h="92%" bgColor="#36393E">
                        <VStack
                            align="center"
                            bgColor="#2E3136"
                            w="25%"
                            h="100%"
                            borderRight="1px"
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
                            <Box w="100%">
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
                                            <Heading size="sm">
                                                {section.sectionName}
                                            </Heading>
                                        ))}
                            </Box>
                            {currentGame.hasDaily && (
                                <Box w="100%">
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
                                                <Heading size="sm">
                                                    {section.sectionName}
                                                </Heading>
                                            ))}
                                </Box>
                            )}
                            {currentGame.hasWeekly && (
                                <Box w="100%">
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
                                                <Heading size="sm">
                                                    {section.sectionName}
                                                </Heading>
                                            ))}
                                </Box>
                            )}
                            <Spacer />
                        </VStack>
                    </Flex>
                </VStack>
            )}
        </Box>
    )
}
