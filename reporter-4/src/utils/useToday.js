import React from "react"
import { useContext } from "react"
import { useState } from "react"
import { FireContext } from "../FireContextProvider"

const TodayContext = React.createContext()

export const TodayContextProvider = ({ children }) => {
	const getTodayString = () => {
		return new Date().toDateString().slice(4)
	}
	const [todayString, setTodayString] = useState(getTodayString)
	const { db } = useContext(FireContext)
	const todayDoc = db.doc(
		`users/MPQ/${todayString.slice(-4)}/${todayString.slice(
			0,
			3
		)} ${todayString.slice(-4)}/dailys/${todayString}`
	)

	return (
		<TodayContext.Provider
			value={{
				todayString,
				setTodayString,
				getTodayString,
				todayDoc
			}}
		>
			{children}
		</TodayContext.Provider>
	)
}

export const useToday = () => {
	const today = useContext(TodayContext)
	return today
}
