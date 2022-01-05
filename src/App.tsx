import './scss/app.scss';
import { Homepage } from './Homepage';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Homepage/>
      </ChakraProvider>
    </div>
  );
}

export default App;
