import './scss/app.scss'
import { Homepage } from './Homepage'
import { ChakraProvider } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'

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
            <ChakraProvider>
                <Global styles={GlobalStyles} />
                <Homepage />
            </ChakraProvider>
        </div>
    )
}

export default App
