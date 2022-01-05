import { Box, Flex, VStack, Spacer, Heading, Divider, HStack } from "@chakra-ui/layout";
import { useSelector } from "react-redux";
import { gamesSelectors } from "./slices/gamesSlice";
import { Game } from "./models/game";
import { InformationPanel } from "./InformationPanel";

export const GamePanel = () => {
    const currentGame: Game | null = useSelector(gamesSelectors.currentGame);

    return (
        <Box width="100%" height="100%" bgColor="#36393E" borderTopLeftRadius="15px">
            { (currentGame === undefined || currentGame === null) && (
                <InformationPanel />
            )}
            { currentGame !== undefined && currentGame !== null && (
                <VStack h="100%">
                    <Flex w="95%" h="8%" paddingTop="1%">
                        <Heading>{currentGame.name}</Heading>
                        <Spacer />
                        <VStack h="100%">
                            <Heading size="xs">Time until daily reset</Heading>
                            <Heading size="xs">Time until weekly reset</Heading>
                        </VStack>
                    </Flex>
                    <Divider />
                    <Flex w="100%" h="91%" bgColor="#36393E">
                        <VStack bgColor="#2E3136" w="25%" h="100%" borderRight="1px">
                            <Heading size="xs">Sections</Heading>
                        </VStack>
                    </Flex>
                </VStack>
            )}
        </Box>
    );
}