import { Box, Flex, VStack, Spacer, Heading } from '@chakra-ui/layout'
import { SettingsIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import {
    addSection,
    editGame,
    userSelectors,
    toggleTasksFromReset,
    editGameById,
} from '../slices/userSlice'
import { InformationPanel } from './InformationPanel'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { EditSection } from '../components/EditSection'
import { Section } from '../models/section'
import { EditGame } from '../components/EditGame'
import { Game } from '../models/game'
import { TaskPanel } from '../components/TaskPanel'
import { SectionList } from '../components/SectionList'
import {
    useMediumBgColor,
    useBorderColor,
    useTextColor,
    useLightestBgColor,
} from '../theme'
import Countdown, { zeroPad } from 'react-countdown'
import {
    getDateTimeWithTimezone,
    getNextDailyReset,
    getNextWeeklyReset,
} from '../utils/timeUtils'
import { TaskType } from '../models/task'
import { DateTime } from 'luxon'

export const GamePanel = () => {
    const currentGame = useSelector(userSelectors.currentGame)
    const dispatch = useDispatch()
    const bgColor = useMediumBgColor()
    const lightestBgColor = useLightestBgColor()
    const borderColor = useBorderColor()
    const textColor = useTextColor()

    const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState({
        open: false,
        taskType: TaskType.NORMAL,
    })
    const [selectedSection, setSelectedSection] = useState(
        currentGame?.currentSection ? currentGame?.currentSection : 0
    )
    const [editGameModal, setEditGameModal] = useState(false)
    const [sectionListOpen, setSectionListOpen] = useState(true)

    useEffect(() => {
        if (!currentGame) {
            return
        }
        if (
            currentGame.nextDailyReset &&
            DateTime.now() >= DateTime.fromMillis(currentGame.nextDailyReset)
        ) {
            resetTasks(TaskType.DAILY)
        }
        if (
            currentGame.nextWeeklyReset &&
            DateTime.now() >= DateTime.fromMillis(currentGame.nextWeeklyReset)
        ) {
            resetTasks(TaskType.WEEKLY)
        }
        setSelectedSection(
            currentGame.currentSection ? currentGame.currentSection : 0
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentGame?.id])

    const setCurrentSection = (sectionId: number) => {
        setSelectedSection(sectionId)
        if (currentGame) {
            dispatch(
                editGameById(currentGame?.id, {
                    currentSection: sectionId,
                })
            )
        }
    }

    const resetTasks = (taskType: TaskType) => {
        if (currentGame) {
            dispatch(toggleTasksFromReset(currentGame.id, taskType))
            if (taskType === TaskType.DAILY) {
                dispatch(
                    editGameById(currentGame.id, {
                        nextDailyReset: getNextDailyReset(
                            currentGame.dailyResetTime,
                            typeof currentGame.timezone === 'string'
                                ? currentGame.timezone
                                : currentGame.timezone.value
                        ),
                    })
                )
            } else if (
                taskType === TaskType.WEEKLY &&
                currentGame.weeklyResetDOW
            ) {
                dispatch(
                    editGameById(currentGame.id, {
                        nextWeeklyReset: getNextWeeklyReset(
                            currentGame.weeklyResetDOW,
                            currentGame.dailyResetTime,
                            typeof currentGame.timezone === 'string'
                                ? currentGame.timezone
                                : currentGame.timezone.value
                        ),
                    })
                )
            }
        }
    }

    const [nextDailyReset, setNextDailyReset] = useState(
        currentGame &&
            currentGame.nextDailyReset !== null &&
            typeof currentGame.timezone !== 'string'
            ? getDateTimeWithTimezone(
                  currentGame.nextDailyReset,
                  currentGame?.timezone.value
              )
            : null
    )

    useEffect(() => {
        setNextDailyReset(
            currentGame &&
                currentGame.nextDailyReset !== null &&
                typeof currentGame.timezone !== 'string'
                ? getDateTimeWithTimezone(
                      currentGame.nextDailyReset,
                      currentGame?.timezone.value
                  )
                : null
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentGame?.nextDailyReset])

    const [nextWeeklyReset, setNextWeeklyReset] = useState(
        currentGame &&
            currentGame.nextWeeklyReset !== null &&
            typeof currentGame.timezone !== 'string'
            ? getDateTimeWithTimezone(
                  currentGame.nextWeeklyReset,
                  currentGame?.timezone.value
              )
            : null
    )

    useEffect(() => {
        setNextWeeklyReset(
            currentGame &&
                currentGame.nextWeeklyReset !== null &&
                typeof currentGame.timezone !== 'string'
                ? getDateTimeWithTimezone(
                      currentGame.nextWeeklyReset,
                      currentGame?.timezone.value
                  )
                : null
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentGame?.nextWeeklyReset])

    const newSection: Section = {
        sectionName: '',
        taskType: null,
        id: 0,
    }

    const addNewSection = (sectionObject: Section) => {
        setIsNewSectionModalOpen({ open: false, taskType: TaskType.NORMAL })
        if (currentGame) {
            dispatch(addSection(currentGame.id, sectionObject))
        }
    }

    const editExistingGame = (gameData: Game) => {
        setEditGameModal(false)
        dispatch(editGame(gameData))
    }

    type RendererProps = {
        days: number
        hours: number
        minutes: number
        seconds: number
        completed: boolean
    }

    const timeRenderer = (props: RendererProps, taskType: TaskType) => {
        return (
            <span>
                {' ' + (props.days ? props.days + ':' : '')}
                {zeroPad(props.hours)}:{zeroPad(props.minutes)}:
                {zeroPad(props.seconds)}
            </span>
        )
    }

    return (
        <Box
            width="100%"
            height="100%"
            bgColor={bgColor}
            color={textColor}
            borderTopLeftRadius="15px"
        >
            {isNewSectionModalOpen && (
                <EditSection
                    section={newSection}
                    gameData={currentGame}
                    isModalOpen={isNewSectionModalOpen}
                    closeModal={() =>
                        setIsNewSectionModalOpen({
                            open: false,
                            taskType: TaskType.NORMAL,
                        })
                    }
                    onClick={addNewSection}
                />
            )}
            {!currentGame && <InformationPanel />}
            {currentGame && (
                <VStack h="100%" spacing={0} justifyContent="start">
                    {editGameModal && (
                        <EditGame
                            isModalOpen={editGameModal}
                            onClose={() => setEditGameModal(false)}
                            gameData={currentGame}
                            addGame={editExistingGame}
                        />
                    )}
                    <Flex
                        alignItems="center"
                        w="100%"
                        h="7%"
                        borderBottom="1px"
                        borderColor={borderColor}
                        padding="15px"
                    >
                        <Heading size="lg" color={textColor}>
                            {currentGame.name}
                        </Heading>
                        <Spacer />
                        <VStack alignItems="end">
                            {currentGame.hasDaily && (
                                <Heading size="xs">
                                    Next daily reset:
                                    <Countdown
                                        date={
                                            nextDailyReset !== null
                                                ? nextDailyReset
                                                : 20000
                                        }
                                        renderer={(timeProps) =>
                                            timeRenderer(
                                                timeProps,
                                                TaskType.DAILY
                                            )
                                        }
                                        onComplete={() =>
                                            resetTasks(TaskType.DAILY)
                                        }
                                        overtime={true}
                                    />
                                </Heading>
                            )}
                            {currentGame.hasWeekly && (
                                <Heading size="xs">
                                    Next weekly reset:
                                    <Countdown
                                        date={
                                            nextWeeklyReset !== null
                                                ? nextWeeklyReset
                                                : 20000
                                        }
                                        renderer={(timeProps) =>
                                            timeRenderer(
                                                timeProps,
                                                TaskType.WEEKLY
                                            )
                                        }
                                        onComplete={() =>
                                            resetTasks(TaskType.WEEKLY)
                                        }
                                        overtime={true}
                                    />
                                </Heading>
                            )}
                        </VStack>
                        <SettingsIcon
                            onClick={() => setEditGameModal(true)}
                            className="show-click"
                            mx="20px"
                        />
                    </Flex>
                    <Flex h="100%" w="100%" bgColor={bgColor}>
                        <Box w={sectionListOpen ? '20%' : '5%'}>
                            <SectionList
                                sectionListOpen={sectionListOpen}
                                setSectionListOpen={setSectionListOpen}
                                setIsNewSectionModalOpen={
                                    setIsNewSectionModalOpen
                                }
                                setSelectedSection={setCurrentSection}
                                selectedSectionId={selectedSection}
                                currentGame={currentGame}
                            />
                        </Box>
                        <Box
                            w={sectionListOpen ? '80%' : '95%'}
                            h="100%"
                            bgColor={lightestBgColor}
                        >
                            <TaskPanel
                                gameData={currentGame}
                                sectionId={selectedSection}
                            />
                        </Box>
                    </Flex>
                </VStack>
            )}
        </Box>
    )
}
