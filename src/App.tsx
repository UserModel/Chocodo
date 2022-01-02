import './App.css';
import Homepage from './Homepage';
import React from 'react';
import MomentAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Homepage/>
      </header>
    </div>
  );
}