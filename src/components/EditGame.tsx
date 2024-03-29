import {
    Switch,
    FormControl,
    FormLabel,
    Avatar,
    VStack,
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Alert,
    AlertIcon,
    HStack,
    Spacer,
    useToast,
    Text,
} from '@chakra-ui/react'
import {
    ArrowForwardIcon,
    ArrowBackIcon,
    DeleteIcon,
    CopyIcon,
} from '@chakra-ui/icons'
import { Game } from '../models/game'
import { useState, useEffect } from 'react'
import TimePicker, { TimePickerValue } from 'react-time-picker'
import TimezoneSelect from 'react-timezone-select'
import { getNextDailyReset, getNextWeeklyReset } from '../utils/timeUtils'
import { useDispatch } from 'react-redux'
import { deleteGame } from '../slices/userSlice'
import { useLightestBgColor, useMediumBgColor, useTextColor } from '../theme'
import { DeleteConfirmation } from './DeleteConfirmation'

type PropTypes = {
    isModalOpen: boolean
    onClose: Function
    gameData: Game
    addGame: Function
}

export const EditGame = (props: PropTypes) => {
    let gameData = props.gameData
    const dispatch = useDispatch()
    const [currentStep, setCurrentStep] = useState(0)
    const [gameName, setGameName] = useState(gameData.name)
    const [gameIconURL, setGameIconURL] = useState(gameData.gameIconURL)
    const bgLightColor = useLightestBgColor()
    const bgMediumColor = useMediumBgColor()
    const toast = useToast()

    const textColor = useTextColor()
    const [weeklyResetDOW, setWeeklyResetDOW] = useState(
        gameData.weeklyResetDOW
    )
    const [weeklyResetTime, setWeeklyResetTime] = useState(
        gameData.weeklyResetTime
    )
    const [dailyResetTime, setDailyResetTime] = useState(
        gameData.dailyResetTime
    )
    const [timezone, setTimezone] = useState(gameData.timezone)
    const [hasDaily, setHasDaily] = useState(gameData.hasDaily)
    const [hasWeekly, setHasWeekly] = useState(gameData.hasWeekly)
    const [errorMessage, setErrorMessage] = useState('')

    const timePickerStyle = {
        div: {
            bgColor: bgMediumColor,
            select: {
                bgColor: bgMediumColor,
            },
            option: {
                bgColor: bgMediumColor,
            },
        },
    }

    enum errorMessages {
        NoGameTitle = 'Must set a game title.',
        NoDailyResetTime = 'Must set a daily reset time.',
        NoWeeklyResetTime = 'Must set a weekly reset time.',
        NoWeeklyResetDOW = 'Must set a weekly reset day.',
        NoTimezone = 'Must set a timezone.',
    }

    const clearStates = () => {
        setGameName('')
        setGameIconURL('')
        setWeeklyResetDOW(null)
        setWeeklyResetTime('')
        setDailyResetTime('')
        setCurrentStep(0)
        setTimezone('')
        setHasDaily(false)
        setHasWeekly(false)
        setErrorMessage('')
    }

    const closeModal = () => {
        clearStates()
        props.onClose()
    }

    const updateDailyTime = (value: TimePickerValue | null) => {
        if (value === null) {
            setDailyResetTime('')
        } else {
            setDailyResetTime(value.toString())
        }
    }

    const updateWeeklyTime = (value: TimePickerValue | null) => {
        if (value === null) {
            setWeeklyResetTime('')
        } else {
            setWeeklyResetTime(value.toString())
        }
    }

    const stepZero = () => {
        return (
            <VStack spacing="8px" align="center">
                {errorMessage !== '' && (
                    <Alert status="error">
                        <AlertIcon />
                        {errorMessage}
                    </Alert>
                )}
                <Avatar size="2xl" name={gameName} src={gameIconURL} />

                {/* Game Title */}
                <FormControl w="100%">
                    <FormLabel htmlFor="game-title" mb="8px">
                        Game Title:
                    </FormLabel>
                    <Input
                        autoComplete="off"
                        id="game-title"
                        isRequired={true}
                        value={gameName}
                        onChange={(event) => setGameName(event.target.value)}
                        size="sm"
                    />
                </FormControl>

                {/* Game Icon URL */}
                <FormControl w="100%">
                    <FormLabel mb="8px">Game Icon URL:</FormLabel>
                    <Input
                        autoComplete="off"
                        value={gameIconURL}
                        onChange={(event) => setGameIconURL(event.target.value)}
                        size="sm"
                    />
                </FormControl>
            </VStack>
        )
    }

    const stepOne = () => {
        return (
            <VStack spacing="15px" align="center">
                {errorMessage !== '' && (
                    <Alert status="error">
                        <AlertIcon />
                        {errorMessage}
                    </Alert>
                )}
                <FormControl w="100%" display="flex" alignItems="center">
                    <FormLabel htmlFor="has-daily-reset" mb="0">
                        Does this game have a daily reset?
                    </FormLabel>
                    <Switch
                        id="has-daily-reset"
                        onChange={(event) => setHasDaily(event.target.checked)}
                        isChecked={hasDaily}
                    />
                </FormControl>
                {hasDaily && (
                    <FormControl
                        w="100%"
                        display="flex"
                        alignItems="center"
                        sx={timePickerStyle}
                    >
                        <FormLabel htmlFor="dailyTimeSelect" mb="0">
                            Daily Reset Time:
                        </FormLabel>
                        <TimePicker
                            disableClock={true}
                            value={dailyResetTime}
                            onChange={(value) => {
                                updateDailyTime(value)
                            }}
                        />
                    </FormControl>
                )}
                <FormControl w="100%" display="flex" alignItems="center">
                    <FormLabel htmlFor="has-weekly-reset" mb="0">
                        Does this game have a weekly reset?
                    </FormLabel>
                    <Switch
                        id="has-weekly-reset"
                        onChange={(event) => setHasWeekly(event.target.checked)}
                        isChecked={hasWeekly}
                    />
                </FormControl>
                {hasWeekly && (
                    <>
                        <FormControl
                            w="100%"
                            display="flex"
                            alignItems="center"
                            sx={timePickerStyle}
                        >
                            <FormLabel htmlFor="weeklyTimeSelect" mb="0">
                                Weekly Reset Time:
                            </FormLabel>
                            <TimePicker
                                className="timePicker"
                                disableClock={true}
                                value={weeklyResetTime}
                                onChange={(event) => updateWeeklyTime(event)}
                            />
                        </FormControl>
                        <FormControl w="100%" alignItems="center">
                            <FormLabel htmlFor="weeklyResetDay" mb="0">
                                Weekly Reset Day:
                            </FormLabel>
                            <HStack>
                                <Button
                                    onClick={() => setWeeklyResetDOW(0)}
                                    colorScheme={
                                        weeklyResetDOW === 0 ? 'blue' : 'gray'
                                    }
                                >
                                    Su
                                </Button>
                                <Button
                                    onClick={() => setWeeklyResetDOW(1)}
                                    colorScheme={
                                        weeklyResetDOW === 1 ? 'blue' : 'gray'
                                    }
                                >
                                    M
                                </Button>
                                <Button
                                    onClick={() => setWeeklyResetDOW(2)}
                                    colorScheme={
                                        weeklyResetDOW === 2 ? 'blue' : 'gray'
                                    }
                                >
                                    Tu
                                </Button>
                                <Button
                                    onClick={() => setWeeklyResetDOW(3)}
                                    colorScheme={
                                        weeklyResetDOW === 3 ? 'blue' : 'gray'
                                    }
                                >
                                    W
                                </Button>
                                <Button
                                    onClick={() => setWeeklyResetDOW(4)}
                                    colorScheme={
                                        weeklyResetDOW === 4 ? 'blue' : 'gray'
                                    }
                                >
                                    Th
                                </Button>
                                <Button
                                    onClick={() => setWeeklyResetDOW(5)}
                                    colorScheme={
                                        weeklyResetDOW === 5 ? 'blue' : 'gray'
                                    }
                                >
                                    F
                                </Button>
                                <Button
                                    onClick={() => setWeeklyResetDOW(6)}
                                    colorScheme={
                                        weeklyResetDOW === 6 ? 'blue' : 'gray'
                                    }
                                >
                                    Sa
                                </Button>
                            </HStack>
                        </FormControl>
                    </>
                )}
                {(hasDaily || hasWeekly) && (
                    <FormControl w="100%" alignItems="center">
                        <FormLabel
                            htmlFor="timezoneSelect"
                            paddingBottom="8px"
                            mb="0"
                        >
                            Server Timezone:
                        </FormLabel>
                        <TimezoneSelect
                            value={timezone}
                            onChange={setTimezone}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 10,
                                colors: {
                                    ...theme.colors,
                                    primary75: bgMediumColor,
                                    primary50: bgMediumColor,
                                    primary25: bgMediumColor,
                                    primary: textColor,
                                    neutral0: bgLightColor,
                                    neutral10: textColor,
                                    neutral20: textColor,
                                    neutral30: textColor,
                                    neutral40: textColor,
                                    neutral5: textColor,
                                    danger: textColor,
                                    dangerLight: textColor,
                                    neutral50: textColor,
                                    neutral60: textColor,
                                    neutral70: textColor,
                                    neutral80: textColor,
                                    neutral90: textColor,
                                },
                            })}
                        />
                    </FormControl>
                )}
            </VStack>
        )
    }

    useEffect(() => {
        if (errorMessage === errorMessages.NoGameTitle && gameName !== '') {
            setErrorMessage('')
        } else if (
            errorMessage === errorMessages.NoDailyResetTime &&
            (dailyResetTime !== '' || !hasDaily)
        ) {
            setErrorMessage('')
        } else if (
            errorMessage === errorMessages.NoWeeklyResetTime &&
            (weeklyResetTime !== '' || !hasWeekly)
        ) {
            setErrorMessage('')
        } else if (
            errorMessage === errorMessages.NoTimezone &&
            (timezone !== '' || (!hasDaily && !hasWeekly))
        ) {
            setErrorMessage('')
        } else if (
            errorMessage === errorMessages.NoWeeklyResetDOW &&
            (weeklyResetDOW !== null || !hasWeekly)
        ) {
            setErrorMessage('')
        }
    }, [
        gameName,
        dailyResetTime,
        weeklyResetTime,
        timezone,
        hasDaily,
        hasWeekly,
        weeklyResetDOW,
        errorMessages,
        errorMessage,
    ])

    const copyGameData = () => {
        navigator.clipboard.writeText(JSON.stringify(gameData))
        toast({
            variant: 'left-accent',
            status: 'success',
            title: `Game data copied to clipboard!`,
            isClosable: true,
        })
    }

    const addGameFromClipboard = () => {
        navigator.clipboard
            .readText()
            .then((gameText) => {
                const clipboardGame: Game = JSON.parse(gameText)
                clipboardGame.id = Math.floor(Math.random() * Date.now())
                props.addGame(clipboardGame)
                toast({
                    variant: 'left-accent',
                    status: 'success',
                    title: `Game data added to Chocodo!`,
                    isClosable: true,
                })
            })
            .catch(() => {
                toast({
                    variant: 'left-accent',
                    status: 'error',
                    title: `Not a valid game object!`,
                    isClosable: true,
                })
            })
    }

    const addGame = () => {
        if (gameName === '') {
            setErrorMessage(errorMessages.NoGameTitle)
        } else if (hasDaily && dailyResetTime === '') {
            setErrorMessage(errorMessages.NoDailyResetTime)
        } else if (hasWeekly && weeklyResetTime === '') {
            setErrorMessage(errorMessages.NoWeeklyResetTime)
        } else if ((hasWeekly || hasDaily) && timezone === '') {
            setErrorMessage(errorMessages.NoTimezone)
        } else if (hasWeekly && weeklyResetDOW === null) {
            setErrorMessage(errorMessages.NoWeeklyResetDOW)
        } else {
            const id =
                gameData.id !== 0
                    ? gameData.id
                    : Math.floor(Math.random() * Date.now())
            const newGame: Game = {
                name: gameName,
                id: id,
                gameIconURL: gameIconURL,
                hasWeekly: hasWeekly,
                hasDaily: hasDaily,
                timezone: timezone,
                weeklyResetDOW: weeklyResetDOW,
                weeklyResetTime: weeklyResetTime,
                nextWeeklyReset: weeklyResetDOW
                    ? getNextWeeklyReset(
                          weeklyResetDOW,
                          weeklyResetTime,
                          typeof timezone === 'string'
                              ? timezone
                              : timezone.value
                      )
                    : null,
                dailyResetTime: dailyResetTime,
                nextDailyReset: getNextDailyReset(
                    dailyResetTime,
                    typeof timezone === 'string' ? timezone : timezone.value
                ),
                tasks: gameData.tasks,
                sections: gameData.sections,
                currentSection: gameData.currentSection,
            }
            clearStates()
            props.addGame(newGame)
        }
    }

    const removeCurrentGame = () => {
        clearStates()
        dispatch(deleteGame(gameData.id))
        props.onClose()
        toast({
            variant: 'left-accent',
            status: 'success',
            title: `Game deleted!`,
            isClosable: true,
        })
    }

    return (
        <Modal isOpen={props.isModalOpen} onClose={() => closeModal()}>
            <ModalOverlay />
            <ModalContent sx={{ bgColor: bgMediumColor, color: textColor }}>
                {gameData.id === 0 && <ModalHeader>Add a New Game</ModalHeader>}
                {gameData.id !== 0 && (
                    <ModalHeader>Edit Existing Game</ModalHeader>
                )}
                <ModalCloseButton />
                <ModalBody>
                    {currentStep === 0 && stepZero()}
                    {currentStep === 1 && stepOne()}
                    {currentStep === 0 && gameData.id === 0 && (
                        <>
                            <VStack spacing={3} mt={3}>
                                <Text>Or import a game below:</Text>

                                <Button
                                    colorScheme="green"
                                    onClick={() => addGameFromClipboard()}
                                >
                                    Click here to import a game from clipboard!
                                </Button>
                            </VStack>
                        </>
                    )}
                </ModalBody>

                <ModalFooter>
                    {gameData.id !== 0 && currentStep === 0 && (
                        <>
                            <DeleteConfirmation
                                children={
                                    <Button
                                        colorScheme="red"
                                        variant="outline"
                                        mr={3}
                                        leftIcon={<DeleteIcon />}
                                    >
                                        Delete Game
                                    </Button>
                                }
                                onConfirm={() => removeCurrentGame()}
                            />
                            <Button
                                colorScheme="blue"
                                variant="outline"
                                mr={3}
                                leftIcon={<CopyIcon />}
                                onClick={() => copyGameData()}
                            >
                                Copy Game Data
                            </Button>
                        </>
                    )}
                    <Spacer />
                    {currentStep !== 0 && (
                        <Button
                            colorScheme="blue"
                            variant="outline"
                            mr={3}
                            onClick={() => setCurrentStep(currentStep - 1)}
                            leftIcon={<ArrowBackIcon />}
                        >
                            Back
                        </Button>
                    )}
                    {currentStep !== 1 && (
                        <Button
                            colorScheme="blue"
                            variant="solid"
                            onClick={() => setCurrentStep(currentStep + 1)}
                            rightIcon={<ArrowForwardIcon />}
                        >
                            Next
                        </Button>
                    )}
                    {currentStep === 1 && (
                        <Button
                            colorScheme="blue"
                            variant="solid"
                            onClick={addGame}
                        >
                            Submit
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
