import { useState } from "react";
import React from "react";
import { Game } from "./models/game";
import { GameBar } from "./GameBar";
import { Stack, HStack, VStack, Button, Box } from '@chakra-ui/react'

export const Homepage = () => {
  return (
    <HStack w='100%' h='100%'>
      <Box w='10%' h='97%'>
        <GameBar />
      </Box>
      <Box w='100%' h='100%'>

      </Box>
    </HStack>
  );
}
