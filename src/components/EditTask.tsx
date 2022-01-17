import {
    Button,
    Input,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Textarea,
    InputGroup,
    InputLeftAddon,
    Flex,
    IconButton,
} from '@chakra-ui/react'
import { SubTask, Task } from '../models/task'
import ResizeTextarea from 'react-textarea-autosize'
import { useState } from 'react'
import { ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons'

type PropTypes = {
    task: Task
    onClose: Function
    onSubmit: Function
    isOpen: boolean
}

export const EditTask = (props: PropTypes) => {
    const task = { ...props.task }
    const [taskText, setTaskText] = useState(task.taskText)
    const [taskWiki, setTaskWiki] = useState(task.wikiLink)
    const [subTasks, setSubTasks] = useState<SubTask[]>(
        task.subtasks ? [...task.subtasks] : []
    )

    return (
        <Drawer
            placement="bottom"
            onClose={() => props.onClose()}
            isOpen={props.isOpen}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>
                    {task.id !== 0 ? 'Edit Task' : 'Add Task'}
                </DrawerHeader>
                <DrawerBody>
                    <Textarea
                        placeholder="Enter task text"
                        minH="unset"
                        overflow="hidden"
                        w="100%"
                        maxW="100%"
                        maxH="none"
                        resize="none"
                        minRows={1}
                        as={ResizeTextarea}
                        fontSize="lg"
                        textAlign="justify"
                        className="textareaElement"
                        value={taskText}
                        autoComplete="off"
                        variant="outline"
                        marginBottom="20px"
                        onChange={(e) => {
                            setTaskText(e.target.value)
                            e.target.style.height = ''
                            e.target.style.height = e.target.scrollHeight + 'px'
                        }}
                        onFocus={(e) => {
                            if (taskText === '') {
                                setTaskText(task.taskText)
                                setTaskWiki(task.wikiLink ? task.wikiLink : '')
                            }
                            e.target.style.height = ''
                            e.target.style.height = e.target.scrollHeight + 'px'
                        }}
                        autoFocus
                        onKeyPress={(event) => {
                            if (
                                event.key === 'Enter' &&
                                !event.shiftKey &&
                                taskText.trim() !== ''
                            ) {
                                props.onSubmit({
                                    ...task,
                                    taskText: taskText,
                                    wikiLink: taskWiki,
                                    subtasks: subTasks,
                                })
                            }
                        }}
                    />
                    {subTasks?.map((subTask, index) => {
                        return (
                            <Flex
                                w="100%"
                                marginBottom="20px"
                                alignItems="center"
                                key={index}
                            >
                                <ArrowForwardIcon h="100%" w="2%" />
                                <Textarea
                                    placeholder="Enter subtask text..."
                                    minH="unset"
                                    overflow="hidden"
                                    w="98%"
                                    ml="10px"
                                    mr="10px"
                                    maxW="98%"
                                    maxH="none"
                                    resize="none"
                                    minRows={1}
                                    as={ResizeTextarea}
                                    fontSize="lg"
                                    textAlign="justify"
                                    className="textareaElement"
                                    value={subTask.taskText}
                                    autoComplete="off"
                                    variant="outline"
                                    marginBottom="0px"
                                    onChange={(e) => {
                                        setSubTasks(
                                            subTasks.map((task) => {
                                                if (task.id === subTask.id) {
                                                    return {
                                                        ...task,
                                                        taskText:
                                                            e.target.value,
                                                    }
                                                }
                                                return task
                                            })
                                        )
                                        e.target.style.height = ''
                                        e.target.style.height =
                                            e.target.scrollHeight + 'px'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.height = ''
                                        e.target.style.height =
                                            e.target.scrollHeight + 'px'
                                    }}
                                    autoFocus
                                />
                                <IconButton
                                    aria-label="delete-subtask"
                                    icon={<CloseIcon />}
                                    onClick={() => {
                                        if (subTasks !== undefined) {
                                            setSubTasks(
                                                subTasks.filter(
                                                    (delSubTask) => {
                                                        return (
                                                            delSubTask.id !==
                                                            subTask.id
                                                        )
                                                    }
                                                )
                                            )
                                        }
                                    }}
                                />
                            </Flex>
                        )
                    })}
                    <Flex w="100%" marginBottom="20px" alignItems="center">
                        <ArrowForwardIcon h="100%" w="2%" />
                        <Button
                            w="100%"
                            colorScheme="green"
                            ml="10px"
                            onClick={() =>
                                setSubTasks([
                                    ...subTasks,
                                    {
                                        taskText: '',
                                        completed: false,
                                        id: Math.floor(
                                            Math.random() * Date.now()
                                        ),
                                    },
                                ])
                            }
                        >
                            Add New Subtask
                        </Button>
                    </Flex>
                    <InputGroup>
                        <InputLeftAddon children="Optional Wiki Link:" />
                        <Input
                            placeholder="Got a wiki link for this task? Paste it here:"
                            variant="outline"
                            size="md"
                            w="100%"
                            value={taskWiki}
                            onChange={(e) => {
                                setTaskWiki(e.target.value)
                            }}
                        />
                    </InputGroup>
                </DrawerBody>
                <DrawerFooter>
                    <Button
                        variant="outline"
                        mr={3}
                        onClick={() => props.onClose()}
                    >
                        Cancel
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={() => {
                            props.onSubmit({
                                ...task,
                                taskText: taskText,
                                wikiLink: taskWiki,
                                subtasks: subTasks,
                            })
                        }}
                    >
                        Submit
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
