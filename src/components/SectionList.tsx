import {
    AddIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    SettingsIcon,
} from '@chakra-ui/icons'
import {
    VStack,
    Flex,
    Heading,
    Spacer,
    IconButton,
    Button,
    useColorModeValue,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { EditSectionList } from './EditSectionList'
import { Game } from '../models/game'
import { Section } from '../models/section'
import { TaskType } from '../models/task'
import { useLightestBgColor, useMediumBgColor, useTextColor } from '../theme'

export type SectionListProps = {
    setIsNewSectionModalOpen: (value: {
        open: boolean
        taskType: TaskType
    }) => void
    selectedSectionId: number
    setSelectedSection: (value: number) => void
    currentGame: Game
    setSectionListOpen: (value: boolean) => void
    sectionListOpen: boolean
}

export const SectionList = ({
    setIsNewSectionModalOpen,
    selectedSectionId,
    setSelectedSection,
    setSectionListOpen,
    sectionListOpen,
    currentGame,
}: SectionListProps) => {
    const selectedSection = currentGame.sections.find(
        (section) => section.id === selectedSectionId
    )
    const [sectionTab, setSectionTab] = React.useState<number>(
        selectedSection && selectedSection.taskType
            ? selectedSection.taskType
            : 0
    )
    const [editSectionListModal, setEditSectionListModal] = useState(false)
    const [hoveredSection, setHoveredSection] = useState(0)
    const bgColorLight = useLightestBgColor()
    const bgColor = useMediumBgColor()
    const textColor = useTextColor()
    const iconColor = useColorModeValue('black', 'white')
    const renderTaskSection = (taskSection: Section) => (
        <Button
            color={textColor}
            alignSelf="start"
            justifyContent="flex-start"
            w="100%"
            onClick={() => setSelectedSection(taskSection.id)}
            bgColor={
                hoveredSection === taskSection.id ||
                selectedSection?.id === taskSection.id
                    ? bgColorLight
                    : bgColor
            }
            key={taskSection.id}
            pl="10px"
            pr="10px"
            mt="-10px"
            onMouseEnter={() => setHoveredSection(taskSection.id)}
            onMouseLeave={() => setHoveredSection(0)}
            size="sm"
        >
            {taskSection.sectionName}
        </Button>
    )

    useEffect(() => {
        if (!currentGame.hasDaily) {
            if (sectionTab === 1) {
                setSectionTab(0)
            }
            if (
                selectedSection &&
                currentGame.sections.find(
                    (section) => section.id === selectedSection.id
                )?.taskType === TaskType.DAILY
            ) {
                setSelectedSection(0)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentGame.hasDaily])

    useEffect(() => {
        if (!currentGame.hasWeekly) {
            if (sectionTab === 2) {
                setSectionTab(0)
            }
            if (
                selectedSection &&
                currentGame.sections.find(
                    (section) => section.id === selectedSection.id
                )?.taskType === TaskType.WEEKLY
            ) {
                setSelectedSection(0)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentGame.hasWeekly])

    return !currentGame ? null : (
        <>
            {sectionListOpen ? (
                <VStack
                    w="100%"
                    h="100%"
                    spacing={0}
                    color={textColor}
                    bgColor={bgColor}
                    borderRight="0px"
                >
                    {editSectionListModal && (
                        <EditSectionList
                            isModalOpen={editSectionListModal}
                            gameData={currentGame}
                            closeModal={() => setEditSectionListModal(false)}
                        />
                    )}
                    <Flex w="100%" alignItems="baseline">
                        <Heading px="15px" size="md">
                            Sections
                        </Heading>
                        <Spacer />
                        <IconButton
                            sx={{ borderRadius: '0px' }}
                            bgColor={bgColor}
                            color={iconColor}
                            aria-label="new-task"
                            marginBottom="4px"
                            className="show-click"
                            onClick={() =>
                                setIsNewSectionModalOpen({
                                    open: true,
                                    taskType: TaskType.NORMAL,
                                })
                            }
                            icon={<AddIcon />}
                        />

                        <IconButton
                            sx={{ borderRadius: '0px' }}
                            bgColor={bgColor}
                            color={iconColor}
                            aria-label="section-settings"
                            marginBottom="4px"
                            className="show-click"
                            onClick={() => setEditSectionListModal(true)}
                            icon={<SettingsIcon />}
                        />
                        <IconButton
                            sx={{ borderRadius: '0px' }}
                            bgColor={bgColor}
                            color={iconColor}
                            aria-label="section-settings"
                            marginBottom="4px"
                            className="show-click"
                            onClick={() => setSectionListOpen(!sectionListOpen)}
                            icon={<ArrowLeftIcon />}
                        />
                    </Flex>
                    <Tabs
                        w="100%"
                        index={sectionTab}
                        isFitted
                        onChange={(index) => setSectionTab(index)}
                    >
                        <TabList>
                            <Tab>Normal</Tab>
                            <Tab isDisabled={!currentGame.hasDaily}>Daily</Tab>
                            <Tab isDisabled={!currentGame.hasWeekly}>
                                Weekly
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                {currentGame.sections
                                    .filter(
                                        (section) =>
                                            section.taskType === TaskType.NORMAL
                                    )
                                    .map((section) =>
                                        renderTaskSection(section)
                                    )}
                            </TabPanel>
                            <TabPanel>
                                {currentGame.sections
                                    .filter(
                                        (section) =>
                                            section.taskType === TaskType.DAILY
                                    )
                                    .map((section) =>
                                        renderTaskSection(section)
                                    )}
                            </TabPanel>
                            <TabPanel>
                                {currentGame.sections
                                    .filter(
                                        (section) =>
                                            section.taskType === TaskType.WEEKLY
                                    )
                                    .map((section) =>
                                        renderTaskSection(section)
                                    )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <Spacer />
                </VStack>
            ) : (
                <VStack
                    spacing={0}
                    color={textColor}
                    bgColor={bgColor}
                    h="100%"
                    w="100%"
                    borderRight="0px"
                >
                    <Flex w="100%" alignItems="baseline">
                        <IconButton
                            w="100%"
                            alignSelf="top"
                            sx={{ borderRadius: '0px' }}
                            bgColor={bgColor}
                            color={iconColor}
                            aria-label="section-settings"
                            className="show-click"
                            onClick={() => setSectionListOpen(!sectionListOpen)}
                            icon={<ArrowRightIcon />}
                        />
                    </Flex>
                </VStack>
            )}
        </>
    )
}
