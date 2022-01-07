import { AddIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
    VStack,
    Flex,
    Heading,
    Spacer,
    IconButton,
    Button,
    useColorModeValue,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Game } from './models/game'
import { Section } from './models/section'
import { TaskType } from './models/task'

export type SectionListProps = {
    setIsNewSectionModalOpen: (value: boolean) => void
    setSelectedSection: (value: number) => void
    currentGame: Game
}

export const SectionList = ({
    setIsNewSectionModalOpen,
    setSelectedSection,
    currentGame,
}: SectionListProps) => {
    const [generalTasksOpen, setGeneralTasksOpen] = useState(true)
    const [dailyTasksOpen, setDailyTasksOpen] = useState(true)
    const [weeklyTasksOpen, setWeeklyTasksOpen] = useState(true)
    const bgColor = useColorModeValue('#F0F0F0', '#2E3136')
    const textColor = useColorModeValue('black', 'white')

    useEffect(() => {
        setGeneralTasksOpen(true)
        setDailyTasksOpen(true)
        setWeeklyTasksOpen(true)
    }, [currentGame])

    const renderTaskSection = (taskSection: Section) => (
        <Button
            color={textColor}
            alignSelf="start"
            pl="11.5%"
            onClick={() => setSelectedSection(taskSection.id)}
            colorScheme="black"
            key={taskSection.id}
            size="sm"
        >
            {taskSection.sectionName}
        </Button>
    )

    return (
        <VStack
            color={textColor}
            bgColor={bgColor}
            w="20%"
            h="100%"
            borderRight="0px"
        >
            <Flex padding="5%" align="center" w="100%" h="5%">
                <Heading size="md">Sections</Heading>
                <Spacer />
                <IconButton
                    size="xs"
                    onClick={() => setIsNewSectionModalOpen(true)}
                    aria-label="Search database"
                    icon={<AddIcon />}
                />
            </Flex>
            <Button
                alignSelf="start"
                className="dropdown"
                onClick={() => setGeneralTasksOpen(!generalTasksOpen)}
                leftIcon={
                    generalTasksOpen ? (
                        <ChevronDownIcon />
                    ) : (
                        <ChevronRightIcon />
                    )
                }
                colorScheme="white"
                variant="ghost"
            >
                General Tasks Sections
            </Button>
            {generalTasksOpen &&
                currentGame.sections
                    .filter((section) => section.taskType === TaskType.NORMAL)
                    .map((section) => renderTaskSection(section))}
            {currentGame.hasDaily && (
                <>
                    <Button
                        pb="0"
                        alignSelf="start"
                        className="dropdown"
                        onClick={() => setDailyTasksOpen(!dailyTasksOpen)}
                        leftIcon={
                            dailyTasksOpen ? (
                                <ChevronDownIcon />
                            ) : (
                                <ChevronRightIcon />
                            )
                        }
                        colorScheme="white"
                        variant="ghost"
                    >
                        Daily Tasks Sections
                    </Button>
                    {dailyTasksOpen &&
                        currentGame.sections
                            .filter(
                                (section) => section.taskType === TaskType.DAILY
                            )
                            .map((section) => renderTaskSection(section))}
                </>
            )}
            {currentGame.hasWeekly && (
                <>
                    <Button
                        alignSelf="start"
                        className="dropdown"
                        onClick={() => setWeeklyTasksOpen(!weeklyTasksOpen)}
                        leftIcon={
                            weeklyTasksOpen ? (
                                <ChevronDownIcon />
                            ) : (
                                <ChevronRightIcon />
                            )
                        }
                        colorScheme="white"
                        variant="ghost"
                    >
                        Weekly Tasks Sections
                    </Button>
                    {weeklyTasksOpen &&
                        currentGame.sections
                            .filter(
                                (section) =>
                                    section.taskType === TaskType.WEEKLY
                            )
                            .map((section) => renderTaskSection(section))}
                </>
            )}
            <Spacer />
        </VStack>
    )
}
