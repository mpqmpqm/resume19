import React, { useState, useEffect } from "react"
// import Card from "./Card.js"
import "./App.css"

function App() {
  const columns = ["A", "B", "C", "D"]
  let currentItem = []

  const [data, setData] = useState([[1], [2], [3], [5]])
  

  function goLeft(e) {
    currentItem = [
      Number(e.target.closest('div.card').dataset.columnid),
      e.target.closest('div.card').querySelector('div.cardText').innerText
    ]

    setData(prevData => {
      let newData = [
        ...prevData
      ]
      newData[currentItem[0]-1] = [...newData[currentItem[0]-1], currentItem[1]]
      return newData
    })
  }

  function goRight(e) {
    currentItem = [
      Number(e.target.closest('div.card').dataset.columnid),
      e.target.closest('div.card').querySelector('div.cardText').innerText
    ]
    console.log(currentItem);

    setData(prevData => {
      let newData = [
        ...prevData
      ]
     
      newData[currentItem[0]+1] = [...newData[currentItem[0]+1], currentItem[1]]
      return newData
    })
  }

  function addCard(e) {
    currentItem = [
      Number(e.target.closest('div.column').dataset.columnid),
      window.prompt('Add a card')
    ]
    setData(prevData => {
      let newData = [
        ...prevData
      ]
      newData[currentItem[0]] = [...newData[currentItem[0]], currentItem[1]]
      return newData
    })

  }

	return (
		<div className="App">
			{columns.map((column, i) => {
				return (
          <div
            className="column"  
            key={column}
            data-columnid = {i}
            >
						  <h2>{column}</h2>
						    {data[i].map((card, j) => {
							    return (
                    <div
                      data-cardid={j}
                      data-columnid = {i} className="card"
                      key = {j}
                      >
                        {i !== 0
                        ? <button onClick={goLeft}>&larr;</button>
                        : null}
                        <div className='cardText'>{card}</div>
                        {i !==3
                        ? <button onClick={goRight}>&rarr;</button>
                        : null}

                    </div>
                  )
                })}
              <button
                onClick={addCard}
                >Same</button>
          </div>)})}
          </div>
  )}

export default App
