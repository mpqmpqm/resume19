import React, {useContext} from 'react';
import './App.css';
import { FireContext } from './components/FireContextProvider';

// '😊'
// '😄'
// '😘'
// '😔'
// '😭'

function App() {

  //state init
  // const [moodsBatch, setMoodsBatch] = useState([])
  // const [timerKey, setTimerKey] = useState(0)
  // const [firstClick, setFirstClick] = useState(true)

  //testing only
  // const [clickCount, setClickCount] = useState(0)
  let moodsBatch = []
  let timerKey = 0
  let firstClick = true

  //firebase init
  const firebaseApp = useContext(FireContext)
  const {firebase_} = firebaseApp;
  const {firestore} = firebase_;
  const db = firestore(firebaseApp);
  const reports = db.collection('users').doc('MPQ')

  const handleClick = (e) => {
    const emoji = e.target.name || e.target.innerHTML
    // console.log(emoji);
    newReport(emoji)
    dataReadyCheck()
  }

  const newReport = (emoji) => {
    const mood = 
      {
        mood: emoji,
        timestamp: new Date()
      }

    moodsBatch = [...moodsBatch, mood]
    // setMoodsBatch (moodsBatch => [...moodsBatch, mood])
  }

  const dataReadyCheck = () => {
    if (firstClick) {
      firstClick = false;
      let timer = setTimeout (sendData, 200)
      timerKey = timer
    }

    else {
      clearTimeout(timerKey)
      let timer = setTimeout (sendData, 200)
      timerKey = timer
    }
  }

  const sendData =  () => {

      moodsBatch.forEach((mood) => {
      // console.log(`Sending ${mood.mood}`);
      reports.update (
          {reports: firestore.FieldValue.arrayUnion (mood)}
        )
      })

      firstClick = true;
      moodsBatch = [];
    //  setMoodsBatch([])
    // reports.update (
    //   {reports: firestore.FieldValue.arrayUnion ({nothing: 'in common'})}
    // )
  }



  return (
    <div className = 'app'>
    
      <button 
        onClick={handleClick}
        name='😘'
        >
          <span role='img' aria-label='kiss'>😘</span>
      </button>
      <button 
        onClick={handleClick}
        name='👎'
        >
          <span role='img' aria-label='thumbs down'>👎</span>
      </button>
      <button 
        onClick={handleClick}
        name='❓'
        >
          <span role='img' aria-label='?'>❓</span>
      </button>

    </div>
  );
}

export default App;
