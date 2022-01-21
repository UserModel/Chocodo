import { Box, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MobileTaskPanel } from '../components/mobile/MobileTaskPanel'
import { SectionList } from '../components/SectionList'
import { TaskType } from '../models/task'
import { editGame, userSelectors } from '../slices/userSlice'
import { useDarkestBgColor } from '../theme'
import { GameBar } from './GameBar'

export const MobileHomepage = () => {
    const bgColor = useDarkestBgColor()
    const currentGame = useSelector(userSelectors.currentGame)
    const [currentSection, setCurrentSection] = useState(
        currentGame?.currentSection ? currentGame.currentSection : 0
    )
    const dispatch = useDispatch()

    const [showingSectionList, setShowingSectionList] = useState(true)

    const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState({
        open: false,
        taskType: TaskType.NORMAL,
    })
    const [sectionListOpen, setSectionListOpen] = useState(true)

    const changeSection = (sectionId: number) => {
        if (currentGame && currentSection) {
            dispatch(
                editGame({ ...currentGame, currentSection: currentSection })
            )
        }
        console.log(isNewSectionModalOpen)
        setShowingSectionList(false)
        setCurrentSection(sectionId)
    }

    return (
        <>
            {showingSectionList && (
                <HStack
                    bg={bgColor}
                    w="100vw"
                    h="100vh"
                    overflow="hidden"
                    maxW="100vw"
                    maxH="100vh"
                    spacing={0}
                >
                    <Box w="60px" h="100vh" mt="20px">
                        <GameBar />
                    </Box>
                    <Box w="100%" h="100vh" p="2px">
                        {currentGame && (
                            <SectionList
                                sectionListOpen={sectionListOpen}
                                setSectionListOpen={setSectionListOpen}
                                setIsNewSectionModalOpen={
                                    setIsNewSectionModalOpen
                                }
                                setSelectedSection={(sectionId: number) =>
                                    changeSection(sectionId)
                                }
                                selectedSectionId={currentSection}
                                currentGame={currentGame}
                            />
                        )}
                    </Box>
                </HStack>
            )}
            {!showingSectionList && currentGame && (
                <MobileTaskPanel
                    gameData={currentGame}
                    sectionId={currentSection}
                    closeTaskPanel={() => setShowingSectionList(true)}
                />
            )}
        </>
    )
}
