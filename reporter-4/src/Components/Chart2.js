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
	const { todayData } = useToday()

	useEffect(() => {
		console.log(`Check 1: ${new Date().getSeconds()}`)
		const prevDayDocs = getPreviousDayDocs(prevDayCount, db)

		const helper = async () => {
			let localPrevDayData
			const prevDayDataTemplate = {
				"😘": [],
				"😊": [],
				"😃": [],
				"👎": [],
				"❓": []
			}

			console.log(`Outer for loop enter: ${new Date().getSeconds()}`)

			for (const dayDocCollection of prevDayDocs) {
				let datesetPromises = []

				console.log(
					!datesetPromises.length &&
						`Inner for loop enter: ${new Date().getSeconds()}`
				)
				for (const emoji of Object.keys(dayDocCollection)) {
					datesetPromises.push(
						dayDocCollection[emoji].get().then(async res => {
							// if (!res.exists) {
							//   dayDocCollection[emoji].set({

							//   })
							// }
							const data = await res.data()
							return [
								emoji,
								{
									date: data.date,
									day: data.day,
									count: data.timestamps.length
								}
							]
						})
					)
				}
				// console.log(`Check 3: ${new Date().getSeconds()}`)
				localPrevDayData = await Promise.all(datesetPromises).then(
					async res => {
						return res.reduce((object, dateset) => {
							const emoji = dateset[0]
							object[emoji] = [...object[emoji], dateset[1]]
							return object
						}, prevDayDataTemplate)
					}
				)
			}
			console.log(`Check 4: ${new Date().getSeconds()}`)
			//make sure dates are sorted
			Object.keys(localPrevDayData).forEach(emoji => {
				localPrevDayData[emoji] = localPrevDayData[emoji].sort(
					(a, b) => {
						if (new Date(a.date) > new Date(b.date)) return 1
						else return -1
					}
				)
			})
			console.log(`Check 5: ${new Date().getSeconds()}`)
			//add percent data
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
		}
		helper()
	}, [prevDayCount, db])

	return (
		<>
			<div>
				{Object.keys(prevDayData).length ? (
					<Subchart prevDayData={prevDayData} todayData={todayData} />
				) : (
					`waiting...`
				)}
			</div>
			<div>broken</div>
		</>
	)
}
