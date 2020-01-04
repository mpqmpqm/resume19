import React, {useState, useEffect, useContext} from 'react';
import './App.css';
import {VictoryBar, VictoryChart, VictoryPolarAxis, VictoryLabel} from 'victory'
import {FireContext} from './FireContextProvider'
import Pet from "./Pet"

function App() {
  const todayCompare = new Date().toLocaleDateString("en-US");
  // console.log(todayCompare);
  
  const {reports, db} = useContext(FireContext)

  const [localData, setLocalData] = useState ([])
  const [chartData, setChartData] = useState([])

  const [countsArray, setCountsArray] = useState(
    [ {type: 'kiss', count: 40},
      {type: 'warm', count: 40},
      {type: 'laugh', count: 10},
      {type: 'thumbs-down', count: 5},
      {type: 'question', count: 5}
    ])

  function getData () {
    reports.get()
        .then (doc => {
            if (doc.exists){
                  setLocalData (doc.data().reports);
            } else {
                return
            }
        })
        .catch (error => {console.log("Error:", error);})
  }

  function parseToday () {
    
    const todayArray = localData.filter ((report) => report.timestamp.toDate().toLocaleDateString("en-US") === todayCompare)
    // console.log(todayArray);

    const parsed = todayArray.reduce ((endObject, currentItem) => {
      endObject[todayCompare][currentItem.mood] = endObject[todayCompare][currentItem.mood] + 1
      return endObject
    },{[todayCompare]: 
        {
          '😘': 0,
          '😊':0,
          '😃':0,
          '👎':0,
          '❓':0
        }
      }
    )

    const types = Object.keys(parsed[[todayCompare]])
    const values = Object.values(parsed[[todayCompare]])
    
    const recombine = types.map((key, index) => {
      return ({
        type: key,
        count: values[index]
      })
    })

    // console.log(recombine);

    setChartData(recombine)
    // console.log(types, values)
    // console.log(today);
    // console.log(dataToday)

    // console.log(localData.slice().reverse()[0].timestamp.toDate().toLocaleDateString());
  }

  const addKiss = () => {
    setCountsArray (prevState => {
      
      let newArray = prevState.slice(1)
      let newKissCount = prevState[0].count + 1
      return [{type: 'kiss', count: newKissCount}, ...newArray]

    })
  }

  useEffect (()=> {
    getData()
  }, [])

  useEffect (() => {
    if (localData.length) {
      parseToday()
    }
  }, [localData])
  
  
  // useEffect (() => {
  //   setCountsArray([
  //     {type: 'kiss', count: 8},
  //     {type: 'warm', count: 8},
  //     {type: 'laugh', count: 3},
  //     {type: 'thumbs-down', count: 1},
  //     {type: 'question', count: 2},
  //   ])
  // }, [])

  return (
  <>
    <Pet />
    <button onClick = {addKiss}>Add kiss</button>
    <VictoryChart polar
      domain={{x:[0,5]}}
      // domainPadding = {1}  
    >
      <VictoryPolarAxis tickCount={5}></VictoryPolarAxis>
      <VictoryBar
        data={chartData}
        x="type"
        y="count"
        // labels={['1','2','3','4','5']}
        labelComponent = {<VictoryLabel/>}
        style={{ data: { fill: "#c43a31", width: 50 }}}
      />
    </VictoryChart>
  </>
  );
}

export default App;
