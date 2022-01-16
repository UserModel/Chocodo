import { CheckIcon, EditIcon, SearchIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Checkbox,
    Flex,
    IconButton,
    Popover,
    PopoverContent,
    PopoverTrigger,
    TagLeftIcon,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import UseAnimations from 'react-useanimations'
import { Game } from '../models/game'
import { Task } from '../models/task'
import { deleteTask, editTask, toggleCompletedTask } from '../slices/userSlice'
import { useMediumBgColor, useTextColor } from '../theme'
import { EditTask } from './EditTask'
import trash2 from 'react-useanimations/lib/trash2'
import { useEffect, useState } from 'react'

type PropTypes = {
    task: Task
    index: number
    hoveredTask: number
    setHoveredTask: Function
    setTaskBeingEdited: Function
    gameData: Game
    taskBeingEdited: number | null
    sectionId: number
}

export const RenderTask = (props: PropTypes) => {
    const task = props.task
    const index = props.index
    const hoveredTask = props.hoveredTask
    const setHoveredTask = props.setHoveredTask
    const gameData = props.gameData
    const taskBeingEdited = props.taskBeingEdited
    const setTaskBeingEdited = props.setTaskBeingEdited
    const [isGettingDeleted, setIsGettingDeleted] = useState(false)
    const dispatch = useDispatch()
    const textColor = useTextColor()
    const mediumBgColor = useMediumBgColor()
    const iconColor = useColorModeValue('black', 'white')

    useEffect(() => () => setIsGettingDeleted(false), [hoveredTask])

    const displayTask = (task: Task) => {
        return (
            <>
                <Checkbox
                    isChecked={task.completed}
                    onChange={(e) =>
                        dispatch(toggleCompletedTask(gameData.id, task.id))
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
                    //onDoubleClick={() => taskBeingEdited === null ? setTaskBeingEdited(task.id) : ""}
                >
                    {task.taskText}
                </Text>
            </>
        )
    }

    const resetEditTask = () => {
        setTaskBeingEdited(null)
    }

    const removeTask = (task: Task) => {
        resetEditTask()
        dispatch(deleteTask(gameData.id, task.id))
    }

    const submitEditTask = (editedTask: Task) => {
        const task = gameData.tasks.find((task) => task.id === taskBeingEdited)
        if (task) {
            dispatch(
                editTask(gameData.id, {
                    ...task,
                    taskText: editedTask.taskText,
                    wikiLink: editedTask.wikiLink,
                })
            )
            resetEditTask()
        }
    }

    return (
        <Box
            key={index}
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
                        {taskBeingEdited === task.id && (
                            <EditTask
                                task={task}
                                onClose={() => resetEditTask()}
                                onSubmit={(editedTask: Task) =>
                                    submitEditTask(editedTask)
                                }
                                isOpen={taskBeingEdited === task.id}
                            />
                        )}
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
                    <Flex h="100%" gap="5px" className="export-btn">
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
                            icon={<EditIcon color={iconColor} bgColor="none" />}
                            onClick={() => setTaskBeingEdited(task.id)}
                        />
                        <IconButton
                            size="xs"
                            aria-label="delete-button"
                            icon={
                                !isGettingDeleted ? (
                                    <UseAnimations
                                        animation={trash2}
                                        size={20}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    />
                                ) : (
                                    <CheckIcon color="#4caf50" />
                                )
                            }
                            onClick={() =>
                                !isGettingDeleted
                                    ? setIsGettingDeleted(true)
                                    : removeTask(task)
                            }
                        />
                    </Flex>
                </PopoverContent>
            </Popover>
        </Box>
    )
}
