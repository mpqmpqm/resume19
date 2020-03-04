import React, { useState, useEffect, useContext } from "react"
import { getPreviousDayDocs } from "../utils/getData"
import { addDocSnapshot } from "../utils/getData"
import { useToday } from "../utils/useToday"
import { FireContext } from "../FireContextProvider"
import { Subchart } from "./Subchart"

export function Chart({ prevDayCount }) {
	const [todayData, setTodayData] = useState({})
	const [prevDayData, setPrevDayData] = useState([])

	const { todayDoc } = useToday()
	const { db } = useContext(FireContext)

	useEffect(() => {
		const unsubscribe = addDocSnapshot(todayDoc, setTodayData)
		return unsubscribe
	}, [todayDoc])

	useEffect(() => {
		setPrevDayData([])
		const previousDayDocs = getPreviousDayDocs(prevDayCount, db)
		for (const doc of previousDayDocs) {
			doc.get().then(async res => {
				if (!res.exists) {
					doc.set(
						{
							"😘": [],
							"😊": [],
							"😃": [],
							"👎": [],
							"❓": []
						},
						{ merge: true }
					)
				}
				const data = await res.data()
				setPrevDayData(prevState => [
					...prevState,
					{
						date: res.id,
						"😘": data["😘"].length,
						"😊": data["😊"].length,
						"😃": data["😃"].length,
						"👎": data["👎"].length,
						"❓": data["❓"].length
					}
				])
			})
		}
	}, [prevDayCount, db])

	return (
		<>
			{Object.keys(todayData).map(emoji => (
				<p>{`${emoji}: ${todayData[emoji].length}`}</p>
			))}
			{prevDayCount > prevDayData.length ||
			!Object.keys(todayData).length ? (
				`loading...`
			) : (
				<Subchart prevDayData={prevDayData} todayData={todayData} />
			)}
			<button onClick={() => console.log(prevDayData)}>data</button>
		</>
	)
}
