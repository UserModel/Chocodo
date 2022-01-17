import {
    Alert,
    VStack,
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
    HStack,
} from '@chakra-ui/react'
import { AlertIcon } from '@chakra-ui/alert'
import { Section } from '../models/section'
import { useState, useEffect } from 'react'
import { Game } from '../models/game'
import { TaskType } from '../models/task'
import { useMediumBgColor, useTextColor } from '../theme'

type PropTypes = {
    section: Section
    gameData: Game | null
    isModalOpen: { open: boolean; taskType: TaskType }
    closeModal: Function
    onClick: Function
}

enum ErrorMessages {
    NoSectionName = 'You must set a section name.',
    NoTaskType = 'You must set a task type.',
}

export const EditSection = (props: PropTypes) => {
    const [sectionName, setSectionName] = useState(props.section.sectionName)
    const [errorMessage, setErrorMessage] = useState('')
    const [taskType, setTaskType] = useState<TaskType | null>(null)
    const bgMediumColor = useMediumBgColor()
    const textColor = useTextColor()

    useEffect(() => {
        if (props.isModalOpen) {
            setTaskType(
                !props.gameData?.hasDaily && !props.gameData?.hasWeekly
                    ? TaskType.NORMAL
                    : null
            )
        }
        // eslint-disable-next-line
    }, [props.isModalOpen])

    const closeModal = () => {
        setSectionName('')
        setErrorMessage('')
        setTaskType(null)
        props.closeModal()
    }

    useEffect(() => {
        if (
            errorMessage === ErrorMessages.NoSectionName &&
            sectionName !== ''
        ) {
            setErrorMessage('')
        } else if (
            errorMessage === ErrorMessages.NoTaskType &&
            taskType !== null
        ) {
            setErrorMessage('')
        }
    }, [errorMessage, sectionName, taskType])

    const addSection = () => {
        if (sectionName === '') {
            setErrorMessage(ErrorMessages.NoSectionName)
        } else if (taskType === null) {
            setErrorMessage(ErrorMessages.NoTaskType)
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
                setErrorMessage('')
                props.closeModal()
            }
        }
    }

    return (
        <>
            {props.gameData && (
                <Modal
                    isOpen={props.isModalOpen.open}
                    onClose={() => closeModal()}
                >
                    <ModalOverlay />
                    <ModalContent
                        sx={{ bgColor: bgMediumColor, color: textColor }}
                    >
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
                                        autoComplete="off"
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
                                            onClick={() =>
                                                setTaskType(TaskType.NORMAL)
                                            }
                                        >
                                            General
                                        </Button>
                                        {props.gameData !== null &&
                                            props.gameData.hasDaily && (
                                                <Button
                                                    colorScheme={
                                                        taskType ===
                                                        TaskType.DAILY
                                                            ? 'blue'
                                                            : 'gray'
                                                    }
                                                    onClick={() =>
                                                        setTaskType(
                                                            TaskType.DAILY
                                                        )
                                                    }
                                                >
                                                    Daily
                                                </Button>
                                            )}
                                        {props.gameData !== null &&
                                            props.gameData.hasWeekly && (
                                                <Button
                                                    colorScheme={
                                                        taskType ===
                                                        TaskType.WEEKLY
                                                            ? 'blue'
                                                            : 'gray'
                                                    }
                                                    onClick={() =>
                                                        setTaskType(
                                                            TaskType.WEEKLY
                                                        )
                                                    }
                                                >
                                                    Weekly
                                                </Button>
                                            )}
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
            )}
        </>
    )
}
