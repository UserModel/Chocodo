import './scss/app.scss';
import { Homepage } from './Homepage';
import React from 'react';
import MomentAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
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
