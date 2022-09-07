import {
    Heading,
    Image,
    Button,
    useColorMode,
    VStack,
    useToast,
} from '@chakra-ui/react'
import { ThemeSwitch } from '../components/ThemeSwitcher'
import chocodoLight from '../images/chocodoLight.png'
import chocodoDark from '../images/chocodoDark.png'
import { store } from '../store'
import { CopyIcon } from '@chakra-ui/icons'

export const InformationPanel = () => {
    const { colorMode } = useColorMode()

    return (
        <VStack padding="5%">
            <Image
                src={colorMode === 'light' ? chocodoLight : chocodoDark}
                width="30%"
                alt="chocodo logo"
            />
            <Heading size="sm">
                Dark Mode Switcher: <ThemeSwitch />
            </Heading>
        </VStack>
    )
}
