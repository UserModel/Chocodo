import {
    VStack,
    Input,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Heading,
    Box,
    Text,
    Flex,
    IconButton,
    useColorModeValue,
    Spacer,
    Modal,
} from '@chakra-ui/react'
import { useLightestBgColor } from '../theme'
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Section } from '../models/section'
import { useState } from 'react'
import { Game } from '../models/game'
import { TaskType } from '../models/task'
import { useDispatch } from 'react-redux'
import {
    editSection,
    deleteAllTasksFromSection,
    deleteSection,
} from '../slices/userSlice'

type PropTypes = {
    isModalOpen: boolean
    gameData: Game
    closeModal: Function
}

export const EditSectionList = (props: PropTypes) => {
    const dispatch = useDispatch()
    const game = props.gameData
    const iconBg = useColorModeValue('white', '#36393E')
    const iconColor = useColorModeValue('black', 'white')
    const bgColor = useLightestBgColor()

    const closeModal = () => {
        props.closeModal()
    }

    const editSectionName = (section: Section) => {
        if (editedSectionName) {
            dispatch(
                editSection(game.id, {
                    ...section,
                    sectionName: editedSectionName,
                })
            )
            setEditedSectionName('')
            setIsEditing(0)
        }
    }

    const removeSection = (section: Section) => {
        dispatch(deleteAllTasksFromSection(game.id, section.id))
        dispatch(deleteSection(game.id, section.id))
    }

    const [editedSectionName, setEditedSectionName] = useState('')
    const [isEditing, setIsEditing] = useState(0)

    const renderSection = (taskType: TaskType) => {
        return game.sections
            .filter((section) => section.taskType === taskType)
            .map((section) => {
                return (
                    <Flex w="100%" bgColor={bgColor}>
                        {isEditing !== section.id ? (
                            <Flex w="100%">
                                <Text padding="5px">{section.sectionName}</Text>
                                <Spacer />
                                <Flex marginLeft="1%" h="100%">
                                    <IconButton
                                        size="xs"
                                        aria-label="edit-button"
                                        icon={
                                            <EditIcon
                                                color={iconColor}
                                                bgColor={iconBg}
                                            />
                                        }
                                        onClick={() => setIsEditing(section.id)}
                                    />
                                    <IconButton
                                        size="xs"
                                        marginLeft="5%"
                                        aria-label="delete-button"
                                        onClick={() => removeSection(section)}
                                        icon={
                                            <DeleteIcon
                                                color={iconColor}
                                                bgColor={iconBg}
                                            />
                                        }
                                    />
                                </Flex>
                            </Flex>
                        ) : (
                            <>
                                <Input
                                    autoComplete="off"
                                    padding="5px"
                                    autoFocus
                                    onFocus={(e) =>
                                        setEditedSectionName(
                                            section.sectionName
                                        )
                                    }
                                    value={editedSectionName}
                                    onChange={(event) =>
                                        setEditedSectionName(event.target.value)
                                    }
                                    onKeyPress={(event) =>
                                        event.code === 'Enter'
                                            ? editSectionName(section)
                                            : null
                                    }
                                />
                                <Flex marginLeft="1%" h="100%">
                                    <IconButton
                                        size="xs"
                                        aria-label="edit-submit-button"
                                        icon={
                                            <CheckIcon
                                                color={iconColor}
                                                bgColor={iconBg}
                                            />
                                        }
                                        onClick={() => editSectionName(section)}
                                    />
                                    <IconButton
                                        size="xs"
                                        marginLeft="5%"
                                        aria-label="edit-cancel-button"
                                        onClick={() => {
                                            setEditedSectionName('')
                                            setIsEditing(0)
                                        }}
                                        icon={
                                            <CloseIcon
                                                color={iconColor}
                                                bgColor={iconBg}
                                            />
                                        }
                                    />
                                </Flex>
                            </>
                        )}
                    </Flex>
                )
            })
    }

    return (
        <Modal isOpen={props.isModalOpen} onClose={() => closeModal()}>
            <ModalOverlay />
            <ModalContent h="auto" maxH="75%">
                <ModalHeader>Edit Sections</ModalHeader>
                <ModalCloseButton />
                <ModalBody overflowY="auto">
                    <VStack spacing={4} paddingBottom="5%">
                        <Heading size="sm">General Task Sections</Heading>
                        <Box
                            bgColor={bgColor}
                            w="400px"
                            minH="auto"
                            maxH="400px"
                            overflowY="auto"
                            border="2px"
                        >
                            {renderSection(TaskType.NORMAL)}
                        </Box>
                        {game.hasDaily && (
                            <>
                                <Heading size="sm">Daily Task Sections</Heading>
                                <Box
                                    bgColor={bgColor}
                                    w="400px"
                                    minH="auto"
                                    maxH="400px"
                                    overflowY="auto"
                                    border="2px"
                                >
                                    {renderSection(TaskType.DAILY)}
                                </Box>
                            </>
                        )}
                        {game.hasWeekly && (
                            <>
                                <Heading size="sm">
                                    Weekly Task Sections
                                </Heading>
                                <Box
                                    bgColor={bgColor}
                                    w="400px"
                                    minH="auto"
                                    maxH="400px"
                                    overflowY="auto"
                                    border="2px"
                                >
                                    {renderSection(TaskType.WEEKLY)}
                                </Box>
                            </>
                        )}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
