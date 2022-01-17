import { GameBar } from './GameBar'
import { HStack, Box } from '@chakra-ui/react'
import { useDarkestBgColor } from '../theme'
import { GamePanel } from './GamePanel'

export const WebHomepage = () => {
    const bgColor = useDarkestBgColor()
    return (
        <HStack
            bg={bgColor}
            w="100%"
            h="100%"
            overflow="hidden"
            maxW="100vw"
            maxH="100vh"
            spacing={0}
        >
            <Box w="60px" h="100%" mt="20px">
                <GameBar />
            </Box>
            <Box w="100%" h="100%">
                <GamePanel />
            </Box>
        </HStack>
    )
}
