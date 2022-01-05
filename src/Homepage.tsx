import { GameBar } from "./GameBar";
import { HStack, Box } from '@chakra-ui/react'
import { GamePanel } from "./GamePanel";

export const Homepage = () => {
  return (
    <HStack w='100%' h='100%' spacing={0}>
      <Box w='5%' h='97%' overflow="auto" className="hide-scrollbar">
        <GameBar />
      </Box>
      <Box w='95%' h='100%'>
        <GamePanel />
      </Box>
    </HStack>
  );
}
