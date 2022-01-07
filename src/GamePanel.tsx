import { Box, Flex, VStack, Spacer, Heading } from '@chakra-ui/layout'
import { SettingsIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { addSection, editGame, userSelectors } from './slices/userSlice'
import { InformationPanel } from './InformationPanel'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { EditSection } from './components/EditSection'
import { Section } from './models/section'
import { EditGame } from './components/EditGame'
import { Game } from './models/game'
import { TaskPanel } from './TaskPanel'
import { SectionList } from './SectionList'
import { useBgColor, useBorderColor, useTextColor } from './theme'

export const GamePanel = () => {
    const currentGame = useSelector(userSelectors.currentGame)
    const dispatch = useDispatch()
    const bgColor = useBgColor()
    const borderColor = useBorderColor()
    const textColor = useTextColor()

    const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState(false)
    const [selectedSection, setSelectedSection] = useState(0)
    const [editGameModal, setEditGameModal] = useState(false)

    const newSection: Section = {
        sectionName: '',
        taskType: null,
        id: 0,
    }

    const addNewSection = (sectionObject: Section) => {
        setIsNewSectionModalOpen(false)
        if (currentGame) {
            dispatch(addSection(currentGame.id, sectionObject))
        }
    }

    const editExistingGame = (gameData: Game) => {
        setEditGameModal(false)
        dispatch(editGame(gameData))
    }

    return (
        <Box
            width="100%"
            height="100%"
            bgColor={bgColor}
            borderTopLeftRadius="15px"
        >
            {isNewSectionModalOpen && (
                <EditSection
                    section={newSection}
                    gameData={currentGame}
                    isModalOpen={isNewSectionModalOpen}
                    closeModal={() => setIsNewSectionModalOpen(false)}
                    onClick={addNewSection}
                />
            )}
            {!currentGame && <InformationPanel />}
            {currentGame && (
                <VStack h="100%" spacing={0} justifyContent="start">
                    {editGameModal && (
                        <EditGame
                            isModalOpen={editGameModal}
                            onClose={() => setEditGameModal(false)}
                            gameData={currentGame}
                            addGame={editExistingGame}
                        />
                    )}
                    <Flex w="100%" borderBottom="1px" borderColor={borderColor}>
                        <Heading color={textColor} py="0.7%" paddingLeft="1.5%">
                            {currentGame.name}
                        </Heading>
                        <Spacer />
                        <VStack paddingRight="1.5%" paddingTop="0.7%" h="100%">
                            <Heading size="xs">Time until daily reset</Heading>
                            <Heading size="xs">Time until weekly reset</Heading>
                        </VStack>
                        <SettingsIcon
                            onClick={() => setEditGameModal(true)}
                            className="show-click"
                            h="100%"
                            w="3.5%"
                            marginLeft="3%"
                            paddingTop="0.0%"
                            paddingRight="1.5%"
                        />
                    </Flex>
                    <Flex h="100%" w="100%" bgColor={bgColor}>
                        <SectionList
                            setIsNewSectionModalOpen={setIsNewSectionModalOpen}
                            setSelectedSection={setSelectedSection}
                            currentGame={currentGame}
                        />
                        <Box w="80%" h="100%">
                            <TaskPanel
                                gameData={currentGame}
                                sectionId={selectedSection}
                            />
                        </Box>
                    </Flex>
                </VStack>
            )}
        </Box>
    )
}
