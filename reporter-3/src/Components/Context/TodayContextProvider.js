import React, { useContext, useState, useEffect } from "react"
import * as moment from "moment"
import { FireContext } from "./FireContextProvider"

const TodayContext = React.createContext()

const TodayContextProvider = props => {
	const today = moment()
	const { db } = useContext(FireContext)
	const todayDateString = today.clone().format("MMM DD YYYY")

	const todayDocRef = (() => {
		const todayString = today.clone().format("MMM DD YYYY")
		return db.doc(
			`users/MPQ/${todayString.slice(-4)}/${todayString.slice(
				0,
				3
			)} ${todayString.slice(-4)}/dailys/${todayString}`
		)
	})()

	// console.log(todayDocRef);

	const [todayDataObject, setTodayDataObject] = useState({})

	const getTodayDataObject = () => {
		todayDocRef
			.get()
			.then(doc => {
				if (doc.exists) {
					setTodayDataObject(doc.data())
				} else {
					todayDocRef
						.set(
							{
								"😘": [],
								"😊": [],
								"😃": [],
								"👎": [],
								"❓": []
							},
							{ merge: true }
						)
						.then(getTodayDataObject)
				}
			})
			.catch(error => {
				console.log(error)
			})
	}

	// console.log(todayDataObject);

	useEffect(() => {
		// console.log('setting today object');
		getTodayDataObject()
	}, [])

	return (
		<TodayContext.Provider
			value={{
				todayDocRef,
				todayDataObject,
				setTodayDataObject,
				today,
				todayDateString
			}}
		>
			{props.children}
		</TodayContext.Provider>
	)
}

export { TodayContextProvider, TodayContext }
