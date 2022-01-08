import { Heading, VStack } from '@chakra-ui/react'
import { useTextColor } from './theme'
import { ThemeSwitch } from './components/ThemeSwitcher'

export const InformationPanel = () => {
    const textColor = useTextColor()

    return (
        <VStack padding="5%">
            <Heading color={textColor}>Welcome to Chocodo</Heading>
            <Heading size="sm">
                Dark Mode Switcher: <ThemeSwitch />
            </Heading>
            {/*<Heading size="xs">{JSON.stringify(store.getState().user)}</Heading>*/}
        </VStack>
    )
}
