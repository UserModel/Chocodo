import './scss/app.scss'
import { WebHomepage } from './pages/WebHomepage'
import { MobileHomepage } from './pages/MobileHomepage'
import { ChakraProvider } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'
import theme from './theme'
import { isMobile } from 'react-device-detect'

const GlobalStyles = css`
    /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
    .js-focus-visible :focus:not([data-focus-visible-added]) {
        outline: none;
        box-shadow: none;
    }
`
function App() {
    return (
        <div className="App">
            <ChakraProvider theme={theme}>
                <Global styles={GlobalStyles} />
                {isMobile ? <MobileHomepage /> : <WebHomepage />}
            </ChakraProvider>
        </div>
    )
}

export default App
