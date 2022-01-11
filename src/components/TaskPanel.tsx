import { CheckIcon, CloseIcon, EditIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    IconButton,
    Input,
    Tag,
    TagLeftIcon,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Game } from '../models/game'
import {
    addTask,
    toggleCompletedTask,
    editTask,
    deleteTask,
} from '../slices/userSlice'
import { Task } from '../models/task'
import { Section } from '../models/section'
import { useMediumBgColor, useTextColor } from '../theme'
import { Textarea } from '@chakra-ui/react'
import ResizeTextarea from 'react-textarea-autosize'
import { DeleteConfirmation } from './DeleteConfirmation'

type PropTypes = {
    gameData: Game
    sectionId: number
}

export const TaskPanel = (props: PropTypes) => {
    const taskList = [...props.gameData.tasks].sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1
    )
    const [addingNewTask, setAddingNewTask] = useState(false)
    const [newTaskText, setNewTaskText] = useState('')
    const [newTaskWiki, setNewTaskWiki] = useState('');
    const section: Section | undefined = props.gameData?.sections?.find(
        (section) => section.id === props.sectionId
    )
    const textColor = useTextColor()
    const dispatch = useDispatch()
    const [taskBeingEdited, setTaskBeingEdited] = useState<number | null>(null)
    const [editTaskText, setEditTaskText] = useState('')
    const [editTaskWiki, setEditTaskWiki] = useState('')
    const [hoveredTask, setHoveredTask] = useState(0)
    const mediumBgColor = useMediumBgColor()
    const iconBg = useColorModeValue('white', '#36393E')
    const iconColor = useColorModeValue('black', 'white')

    const resetNewTask = () => {
        setAddingNewTask(false)
        setNewTaskText('')
        setNewTaskWiki('');
    }

    useEffect(() => {
        resetNewTask()
    }, [props.sectionId])

    const submitNewTask = () => {
        if (section && section.taskType !== null && newTaskText) {
            resetNewTask()
            const newTask: Task = {
                taskText: newTaskText,
                completed: false,
                sectionId: section?.id,
                id: Math.floor(Math.random() * Date.now()),
                taskType: section?.taskType,
                subtasks: [],
                wikiLink: newTaskWiki
            }
            dispatch(addTask(props.gameData.id, newTask))
        }
    }

    const submitEditTask = () => {
        const task = props.gameData.tasks.find(
            (task) => task.id === taskBeingEdited
        )
        if (task && editTaskText.trim()) {
            dispatch(
                editTask(props.gameData.id, { ...task, taskText: editTaskText, wikiLink: editTaskWiki })
            )
            setTaskBeingEdited(null)
            setEditTaskText('')
            setEditTaskWiki('')
        }
    }

    const removeTask = (task: Task) => {
        setTaskBeingEdited(null)
        setEditTaskText('')
        dispatch(deleteTask(props.gameData.id, task.id))
    }

    const displayTask = (task: Task) => {
        return (
            <>
                <Checkbox
                    isChecked={task.completed}
                    onChange={(e) =>
                        dispatch(
                            toggleCompletedTask(props.gameData.id, task.id)
                        )
                    }
                    size="md"
                />
                {taskBeingEdited !== task.id ? (
                    <>
                        <Text
                            fontSize="lg"
                            textAlign="justify"
                            w="90%"
                            as={task.completed ? 's' : 'h2'}
                            sx={{ color: task.completed ? 'gray' : textColor }}
                            marginLeft="1.5%"
                            overflowWrap="break-word"
                            wordBreak="break-word"
                            //onDoubleClick={() => taskBeingEdited === null ? setTaskBeingEdited(task.id) : ""}
                        >
                            {task.taskText}
                        </Text>
                        { task.wikiLink && (
                            <Tag as='a' href={task.wikiLink} rel="noreferrer" target="_blank" h="2%" marginLeft='5px' size='md'>
                                <TagLeftIcon boxSize='12px' as={SearchIcon} />
                                Wiki
                            </Tag>
                        ) }
                    </>
                ) : (
                    <VStack w="100%" alignItems='start'>
                        <Textarea
                            minH="unset"
                            overflow="hidden"
                            w="98%"
                            maxW="98%"
                            maxH="none"
                            resize="none"
                            minRows={1}
                            as={ResizeTextarea}
                            fontSize="lg"
                            textAlign="justify"
                            marginLeft="1.5%"
                            className="textareaElement"
                            value={editTaskText}
                            autoComplete='off'
                            onChange={(e) => {
                                setEditTaskText(e.target.value)
                                e.target.style.height = ''
                                e.target.style.height = e.target.scrollHeight + 'px'
                            }}
                            onFocus={(e) => {
                                setEditTaskText(task.taskText)
                                setEditTaskWiki(task.wikiLink ? task.wikiLink : '')
                                e.target.style.height = ''
                                e.target.style.height = e.target.scrollHeight + 'px'
                            }}
                            autoFocus
                            /*onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                                setEditTaskText("");
                                setTaskBeingEdited(null);
                            }}}*/
                            onKeyPress={(event) =>
                                event.code === 'Enter' ? submitEditTask() : null
                            }
                        />
                        <Flex w='100%' padding='1%' marginTop="0px">
                            <Heading w='30%' size='xs'>Got a wiki link for this task? Paste it here: </Heading>
                            <Input 
                                size='xs' 
                                w='70%' 
                                value={editTaskWiki} 
                                onChange={(e) => {
                                    setEditTaskWiki(e.target.value)
                                }}
                            />
                        </Flex>
                    </VStack>
                )}
                {hoveredTask === task.id && taskBeingEdited === null && (
                    <Flex marginLeft="1%" h="100%">
                        <IconButton
                            size="xs"
                            aria-label="edit-button"
                            icon={
                                <EditIcon color={iconColor} bgColor={iconBg} />
                            }
                            onClick={() => setTaskBeingEdited(task.id)}
                        />
                        <DeleteConfirmation 
                            children={<IconButton
                                size="xs"
                                marginLeft="5%"
                                aria-label="delete-button"
                                //onClick={() => removeTask(task)}
                                icon={
                                    <DeleteIcon
                                        color={iconColor}
                                        bgColor={iconBg}
                                    />
                                }
                            />}
                            onConfirm={() => removeTask(task)}
                        />
                    </Flex>
                )}
                {taskBeingEdited === task.id && (
                    <Flex marginLeft="1%" h="100%">
                        <IconButton
                            size="xs"
                            aria-label="edit-submit-button"
                            icon={
                                <CheckIcon color={iconColor} bgColor={iconBg} />
                            }
                            onClick={() => submitEditTask()}
                        />
                        <IconButton
                            size="xs"
                            marginLeft="5%"
                            aria-label="edit-cancel-button"
                            onClick={() => {
                                setEditTaskText('')
                                setTaskBeingEdited(null)
                            }}
                            icon={
                                <CloseIcon color={iconColor} bgColor={iconBg} />
                            }
                        />
                    </Flex>
                )}
            </>
        )
    }

    const renderTask = (task: Task) => (
        <Flex
            w="100%"
            padding="1%"
            key={task.id}
            onMouseOver={(e) => {
                setHoveredTask(task.id)
            }}
            onMouseLeave={(e) => {
                setHoveredTask(0)
            }}
            background={hoveredTask === task.id ? mediumBgColor : ''}
        >
            {displayTask(task)}
        </Flex>
    )

    return (
        <>
            { props.sectionId !== null && section && (
                <Box h="6.9%" textAlign="start" paddingLeft="1%" paddingTop="0.8%" borderBottom="1px">
                    <Heading size="lg">{section.sectionName}</Heading>
                </Box>
            )}
            <VStack maxH="90%" pb="6%" w="100%" overflowY="auto">
                {props.sectionId === 0 ? (
                    <></>
                ) : (
                    <>
                        {taskList.map((task) => {
                            return task.sectionId === props.sectionId
                                ? renderTask(task)
                                : null
                        })}

                        {!addingNewTask && (
                            <Flex w="100%" padding="1%">
                                <Button
                                    w="100%"
                                    colorScheme="green"
                                    onClick={() => setAddingNewTask(true)}
                                >
                                    Add New Task
                                </Button>
                            </Flex>
                        )}
                        {addingNewTask && (
                            <>
                                <Flex w="100%" paddingTop="1%" paddingLeft="1%" paddingRight="1%" marginBottom="0px">
                                    <Textarea
                                        minH="unset"
                                        overflow="hidden"
                                        w="90%"
                                        maxW="90%"
                                        maxH="none"
                                        resize="none"
                                        minRows={1}
                                        autoComplete='off'
                                        as={ResizeTextarea}
                                        fontSize="lg"
                                        textAlign="justify"
                                        marginLeft="1.5%"
                                        className="textareaElement"
                                        value={newTaskText}
                                        onChange={(e) => {
                                            setNewTaskText(e.target.value)
                                            e.target.style.height = ''
                                            e.target.style.height = e.target.scrollHeight + 'px'
                                        }}
                                        onFocus={(e) => {
                                            setNewTaskText('')
                                            e.target.style.height = ''
                                            e.target.style.height = e.target.scrollHeight + 'px'
                                        }}
                                        autoFocus
                                        onKeyPress={(event) =>
                                            event.code === 'Enter' ? submitNewTask() : null
                                        }
                                    />
                                    <IconButton
                                        onClick={() => submitNewTask()}
                                        colorScheme="green"
                                        marginLeft="1%"
                                        aria-label="AddNewTask"
                                        icon={<CheckIcon />}
                                    />
                                    <IconButton
                                        onClick={() => resetNewTask()}
                                        colorScheme="red"
                                        marginLeft="1%"
                                        aria-label="AddNewTask"
                                        icon={<CloseIcon />}
                                    />
                                </Flex>
                                <Flex w='100%' padding='1%' marginTop="0px">
                                    <Heading w='30%' size='xs'>Got a wiki link for this task? Paste it here: </Heading>
                                    <Input size='xs' w='70%' value={newTaskWiki} onChange={(e) => setNewTaskWiki(e.target.value)} />
                                </Flex>
                            </>
                        )}
                    </>
                )}
            </VStack>
        </>
    )
}
