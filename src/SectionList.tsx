import {
    AddIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    SettingsIcon,
} from '@chakra-ui/icons'
import {
    VStack,
    Flex,
    Heading,
    Spacer,
    IconButton,
    Button,
    Divider,
    useColorModeValue,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { EditSectionList } from './components/EditSectionList'
import { Game } from './models/game'
import { Section } from './models/section'
import { TaskType } from './models/task'
import { useBorderColor, useMediumBgColor, useTextColor } from './theme'

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
    const [editSectionListModal, setEditSectionListModal] = useState(false)
    const bgColor = useMediumBgColor()
    const textColor = useTextColor()
    const iconColor = useColorModeValue('black', 'white')

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
        <VStack color={textColor} bgColor={bgColor} h="100%" borderRight="0px">
            {editSectionListModal && (
                <EditSectionList
                    isModalOpen={editSectionListModal}
                    gameData={currentGame}
                    closeModal={() => setEditSectionListModal(false)}
                />
            )}
            <Flex w="100%">
                <Heading
                    borderBottom="1px"
                    h="100%"
                    width="80%"
                    textAlign="start"
                    padding="5%"
                    size="md"
                >
                    Sections
                </Heading>
                <IconButton
                    sx={{ borderRadius: '0px' }}
                    bgColor={bgColor}
                    color={iconColor}
                    aria-label="section-settings"
                    h="100%"
                    w="20%"
                    borderBottom="1px"
                    marginBottom="4px"
                    className="show-click"
                    onClick={() => setEditSectionListModal(true)}
                    icon={<SettingsIcon />}
                />
            </Flex>
            <Flex w="100%">
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
                <Spacer />
                <IconButton
                    color={textColor}
                    bgColor={bgColor}
                    size="xs"
                    h="100%"
                    w="10%"
                    mr="5%"
                    onClick={() => setIsNewSectionModalOpen(true)}
                    aria-label="Search database"
                    icon={<AddIcon />}
                />
            </Flex>
            {generalTasksOpen &&
                currentGame.sections
                    .filter((section) => section.taskType === TaskType.NORMAL)
                    .map((section) => renderTaskSection(section))}
            {currentGame.hasDaily && (
                <>
                    <Flex w="100%">
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
                        <Spacer />
                        <IconButton
                            color={textColor}
                            bgColor={bgColor}
                            size="xs"
                            h="100%"
                            w="10%"
                            mr="5%"
                            onClick={() => setIsNewSectionModalOpen(true)}
                            aria-label="Search database"
                            icon={<AddIcon />}
                        />
                    </Flex>
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
                    <Flex w="100%">
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
                        <Spacer />
                        <IconButton
                            color={textColor}
                            bgColor={bgColor}
                            size="xs"
                            h="100%"
                            w="10%"
                            mr="5%"
                            onClick={() => setIsNewSectionModalOpen(true)}
                            aria-label="Search database"
                            icon={<AddIcon />}
                        />
                    </Flex>
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
