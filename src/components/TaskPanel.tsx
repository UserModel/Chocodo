import { EditIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    IconButton,
    Popover,
    PopoverContent,
    PopoverTrigger,
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
import { Task, TaskType } from '../models/task'
import { Section } from '../models/section'
import { useMediumBgColor, useTextColor } from '../theme'
import { DeleteConfirmation } from './DeleteConfirmation'
import { EditTask } from './EditTask'

type PropTypes = {
    gameData: Game
    sectionId: number
}

export const TaskPanel = (props: PropTypes) => {
    const taskList = [...props.gameData.tasks].sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1
    )
    const [addingNewTask, setAddingNewTask] = useState(false)
    const section: Section | undefined = props.gameData?.sections?.find(
        (section) => section.id === props.sectionId
    )
    const textColor = useTextColor()
    const dispatch = useDispatch()
    const [taskBeingEdited, setTaskBeingEdited] = useState<number | null>(null)
    const [hoveredTask, setHoveredTask] = useState(0)
    const mediumBgColor = useMediumBgColor()
    const iconBg = useColorModeValue('white', '#36393E')
    const iconColor = useColorModeValue('black', 'white')

    const resetNewTask = () => {
        setAddingNewTask(false)
    }

    const resetEditTask = () => {
        setTaskBeingEdited(null)
    }

    const emptyTask: Task = {
        taskText: '',
        completed: false,
        sectionId: 0,
        id: 0,
        taskType: TaskType.WEEKLY,
        subtasks: [],
        wikiLink: '',
    }

    useEffect(() => {
        resetNewTask()
    }, [props.sectionId])

    const submitNewTask = (task: Task) => {
        if (section && section.taskType !== null) {
            resetNewTask()
            const newTask: Task = {
                taskText: task.taskText,
                completed: false,
                sectionId: section?.id,
                id: Math.floor(Math.random() * Date.now()),
                taskType: section?.taskType,
                subtasks: [],
                wikiLink: task.wikiLink,
            }
            dispatch(addTask(props.gameData.id, newTask))
        }
    }

    const submitEditTask = (editedTask: Task) => {
        const task = props.gameData.tasks.find(
            (task) => task.id === taskBeingEdited
        )
        if (task) {
            dispatch(
                editTask(props.gameData.id, {
                    ...task,
                    taskText: editedTask.taskText,
                    wikiLink: editedTask.wikiLink,
                })
            )
            resetEditTask()
        }
    }

    const removeTask = (task: Task) => {
        resetEditTask()
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
                <Text
                    fontSize="lg"
                    textAlign="justify"
                    w="100%"
                    paddingRight="10px"
                    as={task.completed ? 's' : 'h2'}
                    sx={{ color: task.completed ? 'gray' : textColor }}
                    marginLeft="1.5%"
                    overflowWrap="break-word"
                    wordBreak="break-word"
                    // onDoubleClick={() => taskBeingEdited === null ? setTaskBeingEdited(task.id) : ""}
                >
                    {task.taskText}
                </Text>
            </>
        )
    }

    const editingTask = (task: Task) => {
        return (
            <>
                <EditTask
                    task={task}
                    onClose={() => resetEditTask()}
                    onSubmit={(editedTask: Task) => submitEditTask(editedTask)}
                    isOpen={taskBeingEdited === task.id}
                />
            </>
        )
    }

    const renderTask = (task: Task) => (
        <Box
            w="100%"
            onMouseOver={(e) => {
                setHoveredTask(task.id)
            }}
            onFocus={(e) => {
                setHoveredTask(task.id)
            }}
            onMouseLeave={(e) => {
                setHoveredTask(0)
            }}
        >
            <Popover
                placement="top"
                gutter={0}
                isOpen={task.id === hoveredTask}
                offset={[600, -10]}
            >
                <PopoverTrigger>
                    <Flex
                        w="100%"
                        padding="1%"
                        key={task.id}
                        background={
                            hoveredTask === task.id ? mediumBgColor : ''
                        }
                    >
                        {displayTask(task)}
                        {taskBeingEdited === task.id && editingTask(task)}
                    </Flex>
                </PopoverTrigger>
                <PopoverContent
                    w="auto"
                    p="0px"
                    m="0px"
                    bgColor={mediumBgColor}
                    border="none"
                    padding="5px"
                >
                    <Flex h="100%" gap="5px">
                        {task.wikiLink && (
                            <Button
                                as="a"
                                href={task.wikiLink}
                                rel="noreferrer"
                                target="_blank"
                                size="xs"
                            >
                                <TagLeftIcon boxSize="12px" as={SearchIcon} />
                                Wiki
                            </Button>
                        )}
                        <IconButton
                            size="xs"
                            aria-label="edit-button"
                            icon={
                                <EditIcon color={iconColor} bgColor={iconBg} />
                            }
                            onClick={() => setTaskBeingEdited(task.id)}
                        />
                        <DeleteConfirmation
                            children={
                                <IconButton
                                    size="xs"
                                    aria-label="delete-button"
                                    // onClick={() => removeTask(task)}
                                    icon={<DeleteIcon color="#EF5350" />}
                                />
                            }
                            onConfirm={() => removeTask(task)}
                        />
                    </Flex>
                </PopoverContent>
            </Popover>
        </Box>
    )

    return (
        <>
            {props.sectionId !== null && section && (
                <Box
                    h="6.9%"
                    textAlign="start"
                    paddingLeft="1%"
                    paddingTop="0.8%"
                >
                    <Heading size="lg" marginBottom="10px">
                        {section.sectionName}
                    </Heading>
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
                                <EditTask
                                    task={emptyTask}
                                    onClose={() => resetNewTask()}
                                    onSubmit={(task: Task) =>
                                        submitNewTask(task)
                                    }
                                    isOpen={addingNewTask}
                                />
                            </>
                        )}
                    </>
                )}
            </VStack>
        </>
    )
}
