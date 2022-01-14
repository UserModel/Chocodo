import {
    Button,
    Flex,
    Heading,
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
} from '@chakra-ui/react'
import { Task } from '../models/task'
import ResizeTextarea from 'react-textarea-autosize'
import { useState } from 'react'

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
                        placeholder="Task Text"
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
                                event.code === 'Enter' &&
                                !event.shiftKey &&
                                taskText.trim() !== ''
                            ) {
                                props.onSubmit({
                                    ...task,
                                    taskText: taskText,
                                    wikiLink: taskWiki,
                                })
                            }
                        }}
                    />
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
                        onClick={() =>
                            props.onSubmit({
                                ...task,
                                taskText: taskText,
                                wikiLink: taskWiki,
                            })
                        }
                    >
                        Submit
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
