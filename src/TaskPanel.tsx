import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
    Button,
    Checkbox,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    IconButton,
    Input,
    Text,
    VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Game } from './models/game'
import { addTask, toggleCompletedTask } from './slices/userSlice'
import { Task } from './models/task'
import { Section } from './models/section'
import { useTextColor } from './theme'

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
    const section: Section | undefined = props.gameData?.sections?.find(
        (section) => section.id === props.sectionId
    )
    const textColor = useTextColor()
    const dispatch = useDispatch()

    const resetNewTask = () => {
        setAddingNewTask(false)
        setNewTaskText('')
    }

    useEffect(() => {
        resetNewTask()
    }, [props.sectionId])

    const submitNewTask = () => {
        if (section && section.taskType && newTaskText) {
            resetNewTask()
            const newTask: Task = {
                taskText: newTaskText,
                completed: false,
                sectionId: section?.id,
                id: Math.floor(Math.random() * Date.now()),
                taskType: section?.taskType,
            }
            dispatch(addTask(props.gameData.id, newTask))
        }
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
                    textAlign="left"
                    as={task.completed ? 's' : 'h2'}
                    sx={{ color: task.completed ? 'gray' : textColor }}
                    marginLeft="1.5%"
                >
                    <Editable defaultValue={task.taskText}>
                        <EditablePreview />
                        <EditableInput
                            as="textarea"
                            p="10px"
                            cols={500}
                            minHeight={0}
                            rows={0}
                            maxHeight="500px"
                            onMouseEnter={(e: any) => {
                                console.log(e.target.style)
                                e.target.style.height = ''
                                e.target.style.height =
                                    e.target.scrollHeight + 'px'
                            }}
                            onChange={(e: any) => {
                                console.log(e.target.style)
                                e.target.style.height = ''
                                e.target.style.height =
                                    e.target.scrollHeight + 'px'
                            }}
                        />
                    </Editable>
                </Text>
            </>
        )
    }

    const renderTask = (task: Task) => (
        <Flex w="100%" padding="1%" key={task.id}>
            {displayTask(task)}
        </Flex>
    )

    return (
        <VStack maxH="100%" pb="5%" w="100%" overflowY="auto">
            {props.sectionId === 0 ? (
                <p>No Section Selected</p>
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
                        <Flex w="100%" padding="1%">
                            <Input
                                autoFocus={true}
                                id="task-text"
                                isRequired={true}
                                value={newTaskText}
                                onChange={(event) =>
                                    setNewTaskText(event.target.value)
                                }
                                size="md"
                                onKeyPress={(event) =>
                                    event.code === 'Enter'
                                        ? submitNewTask()
                                        : null
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
                    )}
                </>
            )}
        </VStack>
    )
}
