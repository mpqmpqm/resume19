import React, { useState, useEffect, useRef } from 'react';
import Header from "./components/Header"
import Incrementer from './components/Incrementer'

function App() {

  const [user, setUser] = useState("Give me a user.")
  const [inputValue, setInputValue] = useState(null)

  const input = useRef(null)

  useEffect(() => {
    
  }, [])

  const handleClick = () => {
    
  }

  const handleInputChange = (event) => {
    // console.log(event.target.value);
    setInputValue(event.target.value)
  }

  const handleButtonClick = (event) => {
    event.preventDefault()
    // alert(inputValue)
    input.current.value=''
    setInputValue('')
  }

  return (
    <div className="App">
      <Header color ='blue' fontFamily='sans-serif' text={inputValue}/>
      <Incrementer instructions="increment"/>
      <div>{user} <a onClick={handleClick} style={{cursor: 'pointer'}}>Same</a></div>
      <form>
        <input type='text' onChange={handleInputChange} ref={input}></input>
        <button onClick={handleButtonClick}>Clicko</button>
      </form>
    </div>
  );
}

export default App;
