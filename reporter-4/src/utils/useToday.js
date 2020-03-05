import React, { useReducer, useMemo, useEffect } from "react"
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

	const todayDocs = useMemo(() => {
		const todayCollection = db.collection(
			`users/test/${todayString.slice(-4)}/${todayString.slice(
				0,
				3
			)} ${todayString.slice(-4)}/${todayString}`
		)

		return {
			"😘": todayCollection.doc("😘"),
			"😊": todayCollection.doc("😊"),
			"😃": todayCollection.doc("😃"),
			"👎": todayCollection.doc("👎"),
			"❓": todayCollection.doc("❓")
		}
	}, [todayString])

	const [todayData, todayDispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "😘":
					return {
						...state,
						"😘": action.payload
					}
				case "😊":
					return {
						...state,
						"😊": action.payload
					}
				case "😃":
					return {
						...state,
						"😃": action.payload
					}
				case "👎":
					return {
						...state,
						"👎": action.payload
					}
				case "❓":
					return {
						...state,
						"❓": action.payload
					}
			}
		},
		{
			"😘": 0,
			"😊": 0,
			"😃": 0,
			"👎": 0,
			"❓": 0
		}
	)

	useEffect(() => {
		Object.keys(todayDocs).forEach(emoji => {
			todayDocs[emoji].get().then(doc => {
				if (!doc.exists) {
					todayDocs[emoji].set(
						{
							timestamps: []
						},
						{ merge: true }
					)
				}
			})
		})
		const [kiss, warm, laugh, thumbsDown, question] = [
			"😘",
			"😊",
			"😃",
			"👎",
			"❓"
		].map(emoji => {
			return todayDocs[emoji].onSnapshot(doc => {
				todayDispatch({
					type: emoji,
					payload: doc.data()
				})
			})
		})
		return () => {
			kiss()
			warm()
			laugh()
			thumbsDown()
			question()
		}
	}, [todayDocs])

	return (
		<TodayContext.Provider
			value={{
				todayString,
				setTodayString,
				getTodayString,
				todayData,
				todayDispatch
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
