import { Box, Flex, VStack, Spacer, Heading } from '@chakra-ui/layout'
import { SettingsIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { addSection, editGame, userSelectors, toggleTasksFromReset } from './slices/userSlice'
import { InformationPanel } from './InformationPanel'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { EditSection } from './components/EditSection'
import { Section } from './models/section'
import { EditGame } from './components/EditGame'
import { Game } from './models/game'
import { TaskPanel } from './TaskPanel'
import { SectionList } from './SectionList'
import { useMediumBgColor, useBorderColor, useTextColor, useLightestBgColor } from './theme'
import Countdown from 'react-countdown';
import { getDateTimeWithTimezone, getNextDailyReset, getNextWeeklyReset } from './timeUtils'
import { TaskType } from './models/task'

export const GamePanel = () => {
    const currentGame = useSelector(userSelectors.currentGame)
    const dispatch = useDispatch()
    const bgColor = useMediumBgColor()
    const lightestBgColor = useLightestBgColor()
    const borderColor = useBorderColor()
    const textColor = useTextColor()

    const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState(false)
    const [selectedSection, setSelectedSection] = useState(0)
    const [editGameModal, setEditGameModal] = useState(false)

    const nextDailyReset = (currentGame && currentGame.nextDailyReset !== null && typeof currentGame.timezone !== "string") ? getDateTimeWithTimezone(currentGame.nextDailyReset, currentGame?.timezone.value) : null;
    const nextWeeklyReset = (currentGame && currentGame.nextWeeklyReset !== null && typeof currentGame.timezone !== "string") ? getDateTimeWithTimezone(currentGame.nextWeeklyReset, currentGame?.timezone.value) : null;

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

    const editExistingGame = (gameData: Game) => {
        setEditGameModal(false)
        dispatch(editGame(gameData))
    }

    type RendererProps = {
        days: number,
        hours: number, 
        minutes: number,
        seconds: number,
        completed: boolean
    }

    const timeRenderer = (props: RendererProps, taskType: TaskType) => {
        if (props.completed && currentGame) {
          dispatch(toggleTasksFromReset(currentGame.id, taskType));
          if ( typeof currentGame.timezone !== "string" ) {
            if ( taskType === TaskType.DAILY ) {
                dispatch(editGame({...currentGame, nextDailyReset: getNextDailyReset(currentGame.dailyResetTime, currentGame.timezone.value) }))
            } else if ( taskType === TaskType.WEEKLY && currentGame.weeklyResetDOW ) {
                dispatch(editGame({...currentGame, nextWeeklyReset: getNextWeeklyReset(currentGame.weeklyResetDOW, currentGame.weeklyResetTime, currentGame.timezone.value)}))
            }
        }
          return <></>;
        } else {
          const daysLeft = props.days > 0 ? (props.days + (props.hours > 0 ? (props.days > 1 ? " days, " : " day, ") : (props.days > 1 ? " days" : " day"))) : ""
          const hoursLeft = props.hours > 0 ? (props.hours + (props.minutes > 0 ? " hours, " : " hours")) : ""
          const minutesLeft = props.minutes > 0 ? (props.minutes + (props.seconds > 0 ? " minutes, " : " minutes")) : ""
          const secondsLeft = props.seconds > 0 ? props.seconds + " seconds" : ""
          return <span> {daysLeft}{hoursLeft}{minutesLeft}{secondsLeft}</span>;
        }
      };
    
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
                    closeModal={() => setIsNewSectionModalOpen(false)}
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
                    <Flex w="100%" borderBottom="1px" borderColor={borderColor}>
                        <Heading color={textColor} py="0.7%" paddingLeft="1.5%">
                            {currentGame.name}
                        </Heading>
                        <Spacer />
                        <VStack paddingRight="1.5%" paddingTop="0.7%" h="100%">
                            <Heading size="xs">Time until daily reset:
                                <Countdown date={nextDailyReset !== null ? nextDailyReset : 0} renderer={(props) => timeRenderer(props, TaskType.DAILY)} />
                            </Heading>
                            <Heading size="xs">Time until weekly reset:
                                <Countdown date={nextWeeklyReset !== null ? nextWeeklyReset : 0} renderer={(props) => timeRenderer(props, TaskType.WEEKLY)} />
                            </Heading>
                        </VStack>
                        <SettingsIcon
                            onClick={() => setEditGameModal(true)}
                            className="show-click"
                            h="100%"
                            w="3.5%"
                            marginLeft="3%"
                            paddingTop="0.0%"
                            paddingRight="1.5%"
                        />
                    </Flex>
                    <Flex h="100%" w="100%" bgColor={bgColor}>
                        <SectionList
                            setIsNewSectionModalOpen={setIsNewSectionModalOpen}
                            setSelectedSection={setSelectedSection}
                            currentGame={currentGame}
                        />
                        <Box w="80%" h="100%" bgColor={lightestBgColor}>
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
