import React, {
	useState,
	useEffect,
	useContext,
	useReducer,
	useMemo
} from "react"
import { getPreviousDayDocs } from "../utils/getData"
import { useToday } from "../utils/useToday"
import { FireContext } from "../FireContextProvider"
import { Subchart } from "./Subchart"

export function Chart2({ prevDayCount }) {
	const [prevDayData, setPrevDayData] = useState({})
	const { db } = useContext(FireContext)
	const { todayData, todayReady } = useToday()
	const [prevDayReady, setPrevDayReady] = useState(false)

	useEffect(() => {
		const prevDayDocs = getPreviousDayDocs(prevDayCount, db)

		setPrevDayReady(false)

		const helper = async () => {
			let datesetPromises = []
			for (const dayDocCollection of prevDayDocs) {
				let dataPromises = []

				for (const emoji of Object.keys(dayDocCollection)) {
					dataPromises.push(
						dayDocCollection[emoji].get().then(res => {
							// if (!res.exists) {
							//   dayDocCollection[emoji].set({

							//   })
							// }
							return [emoji, res.data()]
						})
					)
				}
				datesetPromises.push(dataPromises)
			}

			let z = Promise.all(
				datesetPromises.map(dayArray => {
					return Promise.all(dayArray)
				})
			)

			z.then(res => {
				const prevDayDataTemplate = {
					"😘": [],
					"😊": [],
					"😃": [],
					"👎": [],
					"❓": []
				}
				const localPrevDayData = res.reduce((object, dateset) => {
					dateset.forEach(emojiWithData => {
						const [emoji, data] = emojiWithData
						object[emoji] = [
							...object[emoji],
							{
								date: data.date,
								day: data.day,
								count: data.timestamps.length
							}
						]
					})
					return object
				}, prevDayDataTemplate)
				Object.keys(localPrevDayData).forEach(emoji => {
					localPrevDayData[emoji] = localPrevDayData[emoji].sort(
						(a, b) => {
							if (new Date(a.date) > new Date(b.date)) return 1
							else return -1
						}
					)
				})
				Object.keys(localPrevDayData).forEach(emoji => {
					const rest = Object.keys(localPrevDayData).filter(
						key => key !== emoji
					)
					localPrevDayData[emoji] = [
						...localPrevDayData[emoji].map(entry => {
							const currentDate = entry[`date`]
							return {
								date: entry[`date`],
								count: entry[`count`],
								day: entry[`day`],
								percent:
									(entry[`count`] /
										rest.reduce((sum, emoji) => {
											const currentEntry = localPrevDayData[
												emoji
											].filter(
												entry => entry[`date`] === currentDate
											)[0]
											return sum + currentEntry[`count`]
										}, entry[`count`])) *
										100 || 0
							}
						})
					]
				})
				setPrevDayData(localPrevDayData)
				setPrevDayReady(true)
			})
		}
		helper()
	}, [prevDayCount, db])

	return (
		<>
			<div>
				{Object.keys(prevDayData).length ? (
					<>
						<Subchart
							prevDayData={prevDayData}
							todayData={todayData}
						/>
						<div>{!prevDayReady && `Loading....`}</div>
					</>
				) : (
					`waiting...`
				)}
			</div>
			<div>broken</div>
		</>
	)
}
