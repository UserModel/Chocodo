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
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Textarea,
    extendTheme,
} from '@chakra-ui/react'
import { Task } from '../models/task'
import ResizeTextarea from 'react-textarea-autosize'
import { useState } from 'react'

type PropTypes = {
    task: Task
    onClose: Function,
    onSubmit: Function,
    isOpen: boolean
}

export const EditTask = (props: PropTypes) => {

    const task = {...props.task};
    const [taskText, setTaskText] = useState(task.taskText);
    const [taskWiki, setTaskWiki] = useState(task.wikiLink);

    return (
        <Drawer placement='bottom' onClose={() => props.onClose()} isOpen={props.isOpen}>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>{task.id !== 0 ? 'Edit Task' : 'Add Task'}</DrawerHeader>
            <DrawerBody>
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
                        value={taskText}
                        autoComplete='off'
                        onChange={(e) => {
                            setTaskText(e.target.value)
                            e.target.style.height = ''
                            e.target.style.height = e.target.scrollHeight + 'px'
                        }}
                        onFocus={(e) => {
                            if ( taskText === '' ) {
                                setTaskText(task.taskText)
                                setTaskWiki(task.wikiLink ? task.wikiLink : '')
                            }
                            e.target.style.height = ''
                            e.target.style.height = e.target.scrollHeight + 'px'
                        }}
                        autoFocus
                        /*onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                            setEditTaskText("");
                            setTaskBeingEdited(null);
                        }}}*/
                        onKeyPress={(event) => {
                            if (event.code === 'Enter' && !event.shiftKey && taskText.trim() !== '') {
                                props.onSubmit({ ...task, taskText: taskText, wikiLink: taskWiki });
                                }
                            }
                        }
                    />
                    <Flex w='100%' padding='1%' marginTop="0px">
                        <Heading w='30%' size='xs'>Got a wiki link for this task? Paste it here: </Heading>
                        <Input 
                            size='xs' 
                            w='70%' 
                            value={taskWiki} 
                            onChange={(e) => {
                                setTaskWiki(e.target.value)
                            }}
                        />
                    </Flex>
                </DrawerBody>
                <DrawerFooter borderTopWidth='1px'>
                    <Button variant='outline' mr={3} onClick={() => props.onClose()}>
                    Cancel
                    </Button>
                    <Button colorScheme='blue' onClick={() => props.onSubmit({ ...task, taskText: taskText, wikiLink: taskWiki })}>Submit</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}