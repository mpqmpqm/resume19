import React, { useState, useEffect } from "react"
import "./App.css"

function App() {
	const columns = ["Winnie", "Thomas", "Bob", "George"]

	let start = {
		Winnie: [],
		Thomas: [],
		Bob: [],
		George: []
	}

	if (localStorage.data) {
		start = JSON.parse(window.localStorage.data)
	}

	const [data, setData] = useState(start)

	const addCard = event => {
		const cardText = prompt("Enter card")
		const column = event.target.closest("div").id
		if (cardText.length){
		setData(prevData => {
			return {
				...prevData,
				[column]: [...prevData[column], cardText]
			}
		})}
	}

	const saveText = (event) => {
		return event.target.closest('div.card').querySelector('p').innerText
	}

	const getIndex = (event) => {
		return columns.indexOf(event.target.closest("div.column").id)
	}

	const goLeft = event => {
		const currentText = saveText(event)
		const currentIndex = getIndex(event)

		setData ((prevData) => {
			return {
				...prevData,
				[columns[currentIndex]]: prevData[columns[currentIndex]].filter(card => card !== currentText), 
				[columns[currentIndex-1]]:[...prevData[columns[currentIndex-1]], currentText]
			}
		})
	}

	const goRight = event => {
		const currentText = saveText(event)
		const currentIndex = getIndex(event)

		setData ((prevData) => {
			return {
				...prevData,
				[columns[currentIndex]]: prevData[columns[currentIndex]].filter(card => card !== currentText), 
				[columns[currentIndex+1]]:[...prevData[columns[currentIndex+1]], currentText]
			}
		})
	}

	useEffect (() => {
		localStorage.setItem('data', JSON.stringify(data));;
	}, [data])
	return (
		<div className="App">
			{columns.map((column, j) => {
				return (
					<div className="column" id={column} key={column}>
						<div>
						<h2>{column}</h2>
						{data[column].map((card, i) => {
							if (j===0) {
								return (
									<div className="card" key={i}>
										<div></div>
										<p>{card}</p>
										<button onClick={goRight}>&gt;</button>
									</div>
								)
							}
							else if (j===columns.length-1) {
								return (
									<div className="card" key={i}>
										<button onClick={goLeft}>	&lt;</button>
										<p>{card}</p>
										<div></div>
									</div>
								)
							}
							else  {
								return (
									<div className="card" key={i}>
										<button onClick={goLeft}>&lt;</button>
										<p>{card}</p>
										<button onClick={goRight}>&gt;</button>
									</div>
								)
							}
						})
						
					}
					</div>
		
						<button onClick={addCard} className='add'>Add card</button>
					</div>
				)
			})}
		</div>
	)
}

export default App
