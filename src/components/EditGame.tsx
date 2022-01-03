import { Select, Switch, FormControl, FormLabel, Avatar, VStack, Spacer, Wrap, Text, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import { Game } from '../models/game';
import { useState, useEffect } from 'react';
import { setCurrentGame } from '../slices/gamesSlice';
import TimePicker, {TimePickerValue} from 'react-time-picker';
import TimezoneSelect, {ITimezone} from "react-timezone-select"

type PropTypes = {
    isModalOpen: boolean,
    onClose: Function,
    gameData: Game
}

export const EditGame = (props: PropTypes) => {

    let gameData = props.gameData;
    const [currentStep, setCurrentStep] = useState(0);
    const [gameName, setGameName] = useState(gameData.name);
    const [gameIconURL, setGameIconURL] = useState(gameData.gameIconURL);
    const [weeklyResetDOW, setWeeklyResetDOW] = useState(gameData.weeklyResetDOW);
    const [weeklyResetTime, setWeeklyResetTime] = useState("");
    const [dailyResetTime, setDailyResetTime] = useState("");
    const [timezone, setTimezone] = useState({});
    const [hasDaily, setHasDaily] = useState(false);
    const [hasWeekly, setHasWeekly] = useState(false);

    const closeModal = () => {
        setGameName("");
        setGameIconURL("");
        setWeeklyResetDOW(null);
        setWeeklyResetTime("");
        setDailyResetTime("");
        setCurrentStep(0);
        setTimezone({});
        props.onClose();
    }

    const updateDailyTime = (value: TimePickerValue | null) => {
        if ( value === null ) {
            setDailyResetTime("");
        } else {
            setDailyResetTime(value.toString());
        }
    }

    const updateWeeklyTime = (value: TimePickerValue | null) => {
        if ( value === null ) {
            setWeeklyResetTime("");
        } else {
            setWeeklyResetTime(value.toString());
        }
    }

    function stepZero() {
        return (
            <VStack spacing="8px" align='center'>
                <Avatar size="2xl" name={gameName} src={gameIconURL}/>

                {/* Game Title */}
                <FormControl w="100%">
                    <FormLabel mb='8px'>Game Title:</FormLabel>
                    <Input
                        value={gameName}
                        onChange={(event) => setGameName(event.target.value)}
                        size='sm'
                    />
                </FormControl>

                {/* Game Icon URL */}
                <FormControl w="100%">
                    <FormLabel mb='8px'>Game Icon URL:</FormLabel>
                    <Input
                        value={gameIconURL}
                        onChange={(event) => setGameIconURL(event.target.value)}
                        size='sm'
                    />
                </FormControl>
            </VStack>
        );
    }

    function stepOne() {
        return (
            <VStack spacing="15px" align='center'>
                <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='has-daily-reset' mb='0'>
                        Does this game have a daily reset?
                    </FormLabel>
                    <Switch id='has-daily-reset' onChange={(event) => setHasDaily(event.target.checked)} isChecked={hasDaily} />
                </FormControl>
                {
                    hasDaily && (
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='dailyTimeSelect' mb='0'>
                                Daily Reset Time:
                            </FormLabel>
                            <TimePicker required value={dailyResetTime} onChange={(value) => updateDailyTime(value)} />
                        </FormControl>
                    )
                }
                <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='has-weekly-reset' mb='0'>
                        Does this game have a weekly reset?
                    </FormLabel>
                    <Switch id='has-weekly-reset' onChange={(event) => setHasWeekly(event.target.checked)} isChecked={hasWeekly} />
                </FormControl>
                {
                    hasWeekly && (
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='weeklyTimeSelect' mb='0'>
                                Weekly Reset Time:
                            </FormLabel>
                            <TimePicker required value={weeklyResetTime} onChange={(event) =>  updateWeeklyTime(event)} />
                        </FormControl>
                    )
                }
                {
                    hasDaily || hasWeekly && (
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='timezoneSelect' mb='0'>
                                Server Timezone:
                            </FormLabel>
                            {/*<TimezoneSelect value={timezone} onChange={setTimezone} />*/}
                        </FormControl>
                    )
                }
            </VStack>
        );
    }

    return (
        <Modal isOpen={props.isModalOpen} onClose={() => closeModal()}>
            <ModalOverlay />
            <ModalContent>
                { 
                    gameName === "" && (
                        <ModalHeader>Add a New Game</ModalHeader>
                    )
                }
                { 
                    gameName !== "" && (
                        <ModalHeader>Edit Existing Game</ModalHeader>
                    )
                }
                <ModalCloseButton />
                <ModalBody>
                    { currentStep === 0 && stepZero() }
                    { currentStep === 1 && stepOne() }
                </ModalBody>


                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => setCurrentStep(currentStep-1)}>Back</Button>
                    <Button variant='ghost' onClick={() => setCurrentStep(currentStep+1)}>Next</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}