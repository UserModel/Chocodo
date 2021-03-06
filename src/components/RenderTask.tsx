import { EditIcon, SearchIcon } from '@chakra-ui/icons'
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
    useToast,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import UseAnimations from 'react-useanimations'
import { Game } from '../models/game'
import { SubTask, Task } from '../models/task'
import {
    deleteTask,
    editTask,
    toggleAllSubtasksAndTask,
    toggleCompletedSubtask,
    toggleCompletedTask,
} from '../slices/userSlice'
import { useMediumBgColor, useTextColor } from '../theme'
import { EditTask } from './EditTask'
import trash2 from 'react-useanimations/lib/trash2'
import { DeleteConfirmation } from './DeleteConfirmation'
import { useEffect } from 'react'

type PropTypes = {
    task: Task
    hoveredTask: number
    setHoveredTask: Function
    setTaskBeingEdited: Function
    gameData: Game
    taskBeingEdited: number | null
    sectionId: number
}

export const RenderTask = (props: PropTypes) => {
    const task = props.task
    const hoveredTask = props.hoveredTask
    const setHoveredTask = props.setHoveredTask
    const gameData = props.gameData
    const taskBeingEdited = props.taskBeingEdited
    const setTaskBeingEdited = props.setTaskBeingEdited
    const dispatch = useDispatch()
    const textColor = useTextColor()
    const mediumBgColor = useMediumBgColor()
    const iconColor = useColorModeValue('black', 'white')
    const toast = useToast()
    const allChecked =
        task.subtasks &&
        task.subtasks?.filter((subtask) => subtask.completed).length ===
            task.subtasks?.length
    const isIndeterminate =
        task.subtasks &&
        task.subtasks?.filter((subtask) => subtask.completed).length !==
            task.subtasks?.length &&
        task.subtasks?.filter((subtask) => subtask.completed).length > 0

    useEffect(() => {
        if (
            allChecked &&
            !task.completed &&
            task.subtasks &&
            task.subtasks.length > 0
        ) {
            dispatch(toggleCompletedTask(gameData.id, task.id))
        }
        if (
            !allChecked &&
            task.completed &&
            task.subtasks &&
            task.subtasks.length > 0
        ) {
            dispatch(toggleCompletedTask(gameData.id, task.id))
        }
        // eslint-disable-next-line
    }, [allChecked])

    const displayTask = (currentTask: Task | SubTask, isSubtask: boolean) => {
        return (
            <>
                <Checkbox
                    isChecked={
                        task.subtasks && task.subtasks?.length > 0
                            ? isSubtask
                                ? currentTask.completed
                                : allChecked
                            : task.completed
                    }
                    isIndeterminate={
                        task.subtasks && task.subtasks?.length > 0
                            ? isSubtask
                                ? false
                                : isIndeterminate
                            : false
                    }
                    ml={isSubtask ? '25px' : ''}
                    onChange={(e) =>
                        !isSubtask
                            ? dispatch(
                                  toggleAllSubtasksAndTask(
                                      gameData.id,
                                      currentTask.id
                                  )
                              )
                            : dispatch(
                                  toggleCompletedSubtask(
                                      gameData.id,
                                      task.id,
                                      currentTask.id
                                  )
                              )
                    }
                    size="md"
                />
                <Text
                    fontSize="lg"
                    textAlign="justify"
                    w="100%"
                    paddingRight="10px"
                    as={currentTask.completed ? 's' : 'h2'}
                    sx={{ color: currentTask.completed ? 'gray' : textColor }}
                    marginLeft="1.5%"
                    overflowWrap="break-word"
                    wordBreak="break-word"
                    //onDoubleClick={() => taskBeingEdited === null ? setTaskBeingEdited(task.id) : ""}
                >
                    {currentTask.taskText}
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
        toast({
            variant: 'left-accent',
            status: 'success',
            title: `Task deleted!`,
            isClosable: true,
        })
    }

    const submitEditTask = (editedTask: Task) => {
        const task = gameData.tasks.find((task) => task.id === taskBeingEdited)
        const allowSubtaskEdit =
            (editedTask.subtasks &&
                editedTask.subtasks.filter((sub) => sub.taskText.trim() === '')
                    .length === 0) ||
            !editedTask.subtasks ||
            editedTask.subtasks.length === 0

        if (task && allowSubtaskEdit) {
            dispatch(
                editTask(gameData.id, {
                    ...task,
                    taskText: editedTask.taskText,
                    wikiLink: editedTask.wikiLink,
                    subtasks: editedTask.subtasks,
                })
            )
            resetEditTask()
        }
    }

    return (
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
                placement="top-end"
                gutter={0}
                isOpen={task.id === hoveredTask}
                offset={[999999, -10]}
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
                        {displayTask(task, false)}
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
                        <DeleteConfirmation
                            onConfirm={() => removeTask(task)}
                            children={
                                <IconButton
                                    size="xs"
                                    aria-label="delete-button"
                                    icon={
                                        <UseAnimations
                                            animation={trash2}
                                            size={20}
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                        />
                                    }
                                />
                            }
                        />
                    </Flex>
                </PopoverContent>
            </Popover>
            {task.subtasks?.map((subtask) => {
                return (
                    <Flex
                        w="100%"
                        padding="1%"
                        key={subtask.id}
                        background={
                            hoveredTask === task.id ? mediumBgColor : ''
                        }
                    >
                        {displayTask(subtask, true)}
                    </Flex>
                )
            })}
        </Box>
    )
}
