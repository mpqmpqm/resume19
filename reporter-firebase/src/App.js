import React from 'react';
import './App.css';
import Button from './components/Button'
import firebase from './components/firebase/Firebase';
// import FirebaseContext from './components/firebase/FirebaseContext';

// '😊'
// '😄'
// '😘'
// '😔'
// '😭' arbitrary change


class App extends React.Component {

  // constructor() {
  //   super();
  //   // this.state = {
  //   //   mood: ''
  //   // }
  // }


  onClick = (event) => {
    console.log(event.target.name);
    // this.setState ({mood: event.target.name})
    // console.log(this.state.mood);
    const timestamp = new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
    const db = firebase.firestore(firebase);
    db.collection('users').doc(`MPQ`).update (
      {reports: firebase.firestore.FieldValue.arrayUnion ({
        mood: event.target.name,
        timestamp: timestamp
      })}
    )
    }

  render() {

    // console.log(process.env.REACT_APP_MEASUREMENT_ID);
    return (


      <div className = 'app'>

        
        
        <Button name = '😊' content = '😊' onClick = {this.onClick}/>
        <Button name = '😄' content = '😄' onClick = {this.onClick}/>
        <Button name = '😘' content = '😘' onClick = {this.onClick}/>
        <Button name = '😔' content = '😔' onClick = {this.onClick}/>
        <Button name = '😭' content = '😭' onClick = {this.onClick}/>
      
      </div>
  
    );

  }
    
}

export default App;
