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
} from '@chakra-ui/react'
import { AlertIcon } from '@chakra-ui/alert'
import { Section } from '../models/section'
import { useState, useEffect } from 'react'
import { Game } from '../models/game'
import { TaskType } from '../models/task'

type PropTypes = {
    section: Section
    gameData: Game | null
    isModalOpen: { open: boolean; taskType: TaskType }
    closeModal: Function
    onClick: Function
}

enum ErrorMessages {
    NoSectionName = 'You must set a section name.',
}

export const EditSection = (props: PropTypes) => {
    const [sectionName, setSectionName] = useState(props.section.sectionName)
    const [errorMessage, setErrorMessage] = useState('')

    const closeModal = () => {
        setSectionName('')
        setErrorMessage('')
        props.closeModal()
    }

    useEffect(() => {
        if (
            errorMessage === ErrorMessages.NoSectionName &&
            sectionName !== ''
        ) {
            setErrorMessage('')
        }
    }, [errorMessage, sectionName])

    const addSection = () => {
        if (sectionName === '') {
            setErrorMessage(ErrorMessages.NoSectionName)
        } else {
            const id =
                props.section.id !== 0
                    ? props.section.id
                    : Math.floor(Math.random() * Date.now())
            const newSection: Section = {
                sectionName: sectionName,
                taskType: props.isModalOpen.taskType,
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
        <Modal isOpen={props.isModalOpen.open} onClose={() => closeModal()}>
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
