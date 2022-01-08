import { Heading } from '@chakra-ui/react'
import { useMediumBgColor, useBorderColor, useTextColor } from './theme'
import { ThemeSwitch } from './components/ThemeSwitcher'

export const InformationPanel = () => {
    const textColor = useTextColor();

    return (
        <>
            <Heading color={textColor}>Welcome to TODO-Gaming</Heading>
            <ThemeSwitch />
        </>
    )
}
