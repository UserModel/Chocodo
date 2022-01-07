import { Heading, useColorModeValue } from '@chakra-ui/react'
import { ThemeSwitch } from './components/ThemeSwitcher'

export const InformationPanel = () => {
    const textColor = useColorModeValue('black', 'white')

    return (
        <>
            <Heading color={textColor}>Welcome to TODO-Gaming</Heading>
            <ThemeSwitch />
        </>
    )
}
