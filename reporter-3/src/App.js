import React, { useState } from 'react';
import './App.css';
import ButtonArray from "./Components/ButtonArray"
import Charts from './Components/Charts'

function App() {

  const [isShowing, setIsShowing] =useState (false)

  const toggleData = () => {
    setIsShowing(prevState => !prevState)
  }


  return (
    <div className='app'>
      <div className = 'charts'>
        {isShowing ? <Charts isDataShowing={isShowing}/> : ''} 
      </div>
      <ButtonArray toggleData={toggleData} isDataShowing = {isShowing}/>
    </div>
  );
}

export default App;
