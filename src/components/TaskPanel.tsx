import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Game } from '../models/game'
import { addTask } from '../slices/userSlice'
import { Task, TaskType } from '../models/task'
import { Section } from '../models/section'
import { EditTask } from './EditTask'
import { RenderTask } from './RenderTask'

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
    const dispatch = useDispatch()
    const [taskBeingEdited, setTaskBeingEdited] = useState<number | null>(null)
    const [hoveredTask, setHoveredTask] = useState(0)

    const emptyTask: Task = {
        taskText: '',
        completed: false,
        sectionId: 0,
        id: 0,
        taskType: TaskType.WEEKLY,
        subtasks: [],
        wikiLink: '',
    }

    const resetEditTask = () => {
        setTaskBeingEdited(null)
    }

    const resetNewTask = () => {
        setAddingNewTask(false)
    }

    useEffect(() => {
        resetNewTask()
        resetEditTask()
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
                        {taskList.map((task, index) => {
                            return task.sectionId === props.sectionId ? (
                                <RenderTask
                                    key={task.id}
                                    task={task}
                                    index={index}
                                    hoveredTask={hoveredTask}
                                    setHoveredTask={setHoveredTask}
                                    setTaskBeingEdited={setTaskBeingEdited}
                                    gameData={props.gameData}
                                    taskBeingEdited={taskBeingEdited}
                                    sectionId={props.sectionId}
                                />
                            ) : null
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
