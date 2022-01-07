import { GameBar } from './GameBar'
import { HStack, Box } from '@chakra-ui/react'
import { GamePanel } from './GamePanel'

export const Homepage = () => {
    return (
        <HStack
            w="100%"
            h="100%"
            overflow="hidden"
            maxW="100vw"
            maxH="100vh"
            spacing={0}
        >
            <Box w="4%" h="100%" mt="20px">
                <GameBar />
            </Box>
            <Box w="96%" h="100%">
                <GamePanel />
            </Box>
        </HStack>
    )
}
