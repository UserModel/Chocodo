import {
    Alert,
    VStack,
    HStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalFooter,
} from '@chakra-ui/react'
import { AlertIcon } from '@chakra-ui/alert'
import { Section } from '../models/section'
import { useState, useEffect } from 'react'
import { Game } from '../models/game'
import { TaskType } from '../models/task'

type PropTypes = {
    section: Section
    gameData: Game | null
    isModalOpen: boolean
    closeModal: Function
    onClick: Function
}

enum ErrorMessages {
    NoSectionName = 'You must set a section name.',
    NoSectionType = 'You must set a section type.',
}

export const EditSection = (props: PropTypes) => {
    const [sectionName, setSectionName] = useState(props.section.sectionName)
    const [taskType, setTaskType] = useState(props.section.taskType)
    const [errorMessage, setErrorMessage] = useState('')

    const closeModal = () => {
        setSectionName('')
        setTaskType(null)
        setErrorMessage('')
        props.closeModal()
    }

    useEffect(() => {
        if (
            errorMessage === ErrorMessages.NoSectionName &&
            sectionName !== ''
        ) {
            setErrorMessage('')
        } else if (
            errorMessage === ErrorMessages.NoSectionType &&
            taskType !== null
        ) {
            setErrorMessage('')
        }
    }, [errorMessage, taskType, sectionName])

    const addSection = () => {
        if (sectionName === '') {
            setErrorMessage(ErrorMessages.NoSectionName)
        } else if (taskType === null) {
            setErrorMessage(ErrorMessages.NoSectionType)
        } else {
            const id =
                props.section.id !== 0
                    ? props.section.id
                    : Math.floor(Math.random() * Date.now())
            const newSection: Section = {
                sectionName: sectionName,
                taskType: taskType,
                id: id,
            }
            if (props.gameData !== null) {
                props.onClick(newSection, props.gameData.id)
                setSectionName('')
                setTaskType(null)
                setErrorMessage('')
                props.closeModal()
            }
        }
    }

    return (
        <Modal isOpen={props.isModalOpen} onClose={() => closeModal()}>
            <ModalOverlay />
            <ModalContent>
                {props.section.id === 0 && (
                    <ModalHeader>Add a New Section</ModalHeader>
                )}
                {props.section.id !== 0 && (
                    <ModalHeader>Edit Existing Section</ModalHeader>
                )}
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={2}>
                        {errorMessage !== '' && (
                            <Alert status="error">
                                <AlertIcon />
                                {errorMessage}
                            </Alert>
                        )}
                        <FormControl w="100%">
                            <FormLabel htmlFor="section-name" mb="8px">
                                Section Name:
                            </FormLabel>
                            <Input
                                id="section-name"
                                isRequired={true}
                                value={sectionName}
                                onChange={(event) =>
                                    setSectionName(event.target.value)
                                }
                                size="sm"
                            />
                        </FormControl>
                        <FormControl w="100%">
                            <FormLabel htmlFor="section-type" mb="8px">
                                Section Type:
                            </FormLabel>
                            <HStack>
                                <Button
                                    colorScheme={
                                        taskType === TaskType.NORMAL
                                            ? 'blue'
                                            : 'gray'
                                    }
                                    onClick={() => setTaskType(TaskType.NORMAL)}
                                >
                                    General
                                </Button>
                                <Button
                                    colorScheme={
                                        taskType === TaskType.DAILY
                                            ? 'blue'
                                            : 'gray'
                                    }
                                    onClick={() => setTaskType(TaskType.DAILY)}
                                >
                                    Daily
                                </Button>
                                <Button
                                    colorScheme={
                                        taskType === TaskType.WEEKLY
                                            ? 'blue'
                                            : 'gray'
                                    }
                                    onClick={() => setTaskType(TaskType.WEEKLY)}
                                >
                                    Weekly
                                </Button>
                            </HStack>
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        variant="outline"
                        mr={3}
                        onClick={() => closeModal()}
                    >
                        Cancel
                    </Button>
                    <Button
                        colorScheme="blue"
                        variant="solid"
                        onClick={() => addSection()}
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
