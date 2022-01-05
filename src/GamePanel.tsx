import { Box } from "@chakra-ui/layout";
import { useSelector } from "react-redux";
import { gamesSelectors } from "./slices/gamesSlice";
import { Game } from "./models/game";

export const GamePanel = () => {
    const currentGame: Game | null = useSelector(gamesSelectors.currentGame);

    console.log(currentGame);

    return (
        <Box width="100%" height="100%" bgColor="#36393E" borderTopLeftRadius="15px">
            { (currentGame === undefined || currentGame === null) && (
                <p>No Current Game</p>
            )}
            { currentGame !== undefined && currentGame !== null && (
                <p>{currentGame.name}</p>
            )}
        </Box>
    );
}