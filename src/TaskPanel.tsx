import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Checkbox, Flex, Heading, IconButton, Input, Spacer, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Game } from "./models/game";
import { addTask, toggleCompletedTask } from "./slices/userSlice";
import { Task, TaskType } from "./models/task";
import { Section } from "./models/section";

type PropTypes = {
    gameData: Game,
    sectionId: number
}

export const TaskPanel = (props: PropTypes) => {

    const [addingNewTask, setAddingNewTask] = useState(false);
    const [newTaskText, setNewTaskText] = useState("");
    const section: Section | undefined = props.gameData?.sections?.find((section) => section.id === props.sectionId);
    const dispatch = useDispatch();

    const resetNewTask = () => {
        setAddingNewTask(false);
        setNewTaskText("");
    }

    useEffect(() =>{
        resetNewTask();
    }, [props.sectionId])

    const submitNewTask = () => {
        if ( section !== undefined && section.taskType !== null && newTaskText !== "" ) {
            resetNewTask();
            const newTask: Task = {
                taskText: newTaskText,
                completed: false,
                sectionId: section?.id,
                id: Math.floor(Math.random() * Date.now()),
                taskType: section?.taskType
            };
            dispatch(addTask(props.gameData.id, newTask));
        }
    }

    const displayTask = (task: Task) => {
        return (
            <>
                <Checkbox isChecked={task.completed} onChange={(e) => dispatch(toggleCompletedTask(props.gameData.id, task.id))} size="md" />
                { task.completed && <Heading as="s" sx={{color: "gray"}} marginLeft="1.5%" size="md">{task.taskText}</Heading> }
                { !task.completed && <Heading marginLeft="1.5%" size="md">{task.taskText}</Heading> }
            </>
        );
    }

    return (
        <VStack h="100%" w="100%">
            { props.sectionId === 0 && <p>No Section Selected</p> }
            { props.sectionId !== 0 && (
                <>
                    {
                        props.gameData.tasks.map((task, index) => {
                            return (task.sectionId === props.sectionId && !task.completed) ? <Flex w="100%" padding="1%" key={index}>{displayTask(task)}</Flex> : null
                        })
                    }
                    {
                        props.gameData.tasks.map((task, index) => {
                            return (task.sectionId === props.sectionId && task.completed) ? <Flex w="100%" padding="1%" key={index}>{displayTask(task)}</Flex> : null
                        })
                    }
                    { !addingNewTask &&
                        <Flex w="100%" padding="1%">
                            <Button w="100%" colorScheme="green" onClick={() => setAddingNewTask(true)}>
                                Add New Task
                            </Button>
                        </Flex>
                    }
                    { addingNewTask &&
                        <Flex w="100%" padding="1%">
                            <Input 
                                id="task-text"
                                isRequired={true}
                                value={newTaskText}
                                onChange={(event) => setNewTaskText(event.target.value)}
                                size="md"
                                onKeyPress={(event) => event.code === "Enter" ? submitNewTask() : null}
                            />
                            <IconButton onClick={() => submitNewTask()} colorScheme="green" marginLeft="1%" aria-label="AddNewTask" icon={<CheckIcon />} />
                            <IconButton onClick={() => resetNewTask()} colorScheme="red" marginLeft="1%" aria-label="AddNewTask" icon={<CloseIcon />} />
                        </Flex>
                    }
                </>
            )}
        </VStack>
    );
}