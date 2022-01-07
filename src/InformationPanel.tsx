import { Heading, useColorModeValue } from '@chakra-ui/react'
import { ThemeSwitch } from './components/ThemeSwitcher'

export const InformationPanel = () => {
    const textColor = useColorModeValue('#23272A', 'white')

    return (
        <>
            <Heading color={textColor}>Welcome to TODO-Gaming</Heading>
            <ThemeSwitch />
        </>
    )
}
