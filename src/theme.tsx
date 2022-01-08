import { useColorModeValue } from '@chakra-ui/react'

export const useTextColor = () => useColorModeValue('#23272A', 'white')
export const useBorderColor = () => useColorModeValue('#E6E6E6', '#232428')
export const useDarkestBgColor = () => useColorModeValue('#E2E5E8', '#202225')
export const useMediumBgColor = () => useColorModeValue('#F2F3F5', '#2E3136')
export const useLightestBgColor = () => useColorModeValue('#FFFFFF', '#36393E')
