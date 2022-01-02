import './App.css';
import Homepage from './Homepage';
import React from 'react';
import MomentAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LocalizationProvider dateAdapter={MomentAdapter}>
          <Homepage/>
        </LocalizationProvider>
      </header>
    </div>
  );
}

export default App;
