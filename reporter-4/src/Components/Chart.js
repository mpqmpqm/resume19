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

export function Chart({ prevDayCount }) {
	const [prevDayData, setPrevDayData] = useState([])
	const { db } = useContext(FireContext)
	const { todayData } = useToday()

	// const prevDayMemo = useMemo(() => {
	// 	let prevDayData = []
	// 	const previousDayDocs = getPreviousDayDocs(prevDayCount, db)
	// 	let outerPromise
	// 	for (const dayDoc of previousDayDocs) {
	// 		let dayData = {}
	// 		let promise
	// 		for (const emoji of Object.keys(dayDoc)) {
	// 			promise = dayDoc[emoji].get().then(async res => {
	// 				if (!res.exists) {
	// 					dayDoc[emoji].set(
	// 						{
	// 							timestamps: []
	// 						},
	// 						{ merge: false }
	// 					)
	// 				}
	// 				const emojiData = await res.data()
	// 				dayData["date"] = res.ref.path.match(
	// 					/\w{3} \d{2} \d{4}/g
	// 				)[0]
	// 				dayData[emoji] = emojiData["timestamps"].length
	// 				return dayData
	// 			})
	// 		}
	// 		outerPromise = promise.then(async res => {
	// 			prevDayData = [...prevDayData, res]
	// 			return prevDayData
	// 		})
	// 	}
	// 	outerPromise.then(res => {
	// 		console.log(`rememo`)
	// 		const prevDaysParsed = ["😘", "😊", "😃", "👎", "❓"].reduce(
	// 			(endObj, emoji) => {
	// 				endObj[emoji] = [
	// 					...res.reduce((endArray, entry, i) => {
	// 						endArray = [
	// 							...endArray,
	// 							{
	// 								date: entry["date"],
	// 								percent:
	// 									(res[i][emoji] /
	// 										Object.keys(res[i])
	// 											.filter(key => key !== `date`)
	// 											.reduce((sum, emoji) => {
	// 												return sum + res[i][emoji]
	// 											}, 0)) *
	// 										100 || 0
	// 							}
	// 						]
	// 						return endArray
	// 					}, [])
	// 				]
	// 				return endObj
	// 			},
	// 			{}
	// 		)
	// 		console.log(JSON.stringify(prevDaysParsed["😘"]))
	// 		return prevDaysParsed
	// 	})
	// }, [prevDayCount, db])

	useEffect(() => {
		if (prevDayCount === 0) {
			return
		}
		let prevDayData = []

		/* let prevDayData = {		
		// "😘": [
			{date,
			count,
			day}
		]
		},
		// "😊": [],
		// "😃": [],
		// "👎": [],
		// "❓": []
		}*/

		const previousDayDocs = getPreviousDayDocs(prevDayCount, db)
		let outerPromise
		for (const dayDoc of previousDayDocs) {
			let dayData = {}
			let promise
			const grep = /\w{3} \w{3} \d{2} \d{4}/g
			for (const emoji of Object.keys(dayDoc)) {
				console.log(dayDoc)
				const date = dayDoc[emoji].path.match(grep)[0].slice(4)
				const day = dayDoc[emoji].path.match(grep)[0].slice(0, 3)
				promise = dayDoc[emoji]
					.get()
					.then(async res => {
						if (!res.exists) {
							dayDoc[emoji].set(
								{
									date: date,
									timestamps: [],
									day: day
								},
								{ merge: true }
							)
						}
						const emojiData = await res.data()
						// const grep = /\w{3} \w{3} \d{2} \d{4}/g
						// const date = res.ref.path.match(grep)[0].slice(4)
						// const day = res.ref.path.match(grep)[0].slice(0, 3)
						dayData["date"] = emojiData[`date`]
						dayData["day"] = emojiData[`day`]
						//prevDayData[emoji][res.ref.path.match(/\w{3} \d{2} \d{4}/g)[0]] = emojiData["timestamps"].length
						dayData[emoji] = emojiData["timestamps"].length
						return dayData
					})
					.catch(err => console.error(err))
			}
			outerPromise = promise
				.then(async res => {
					/*

					*/

					prevDayData = [...prevDayData, res]
					return prevDayData
				})
				.catch(err => console.log(err))
			// setPrevDayData(prevState => [...prevState, dayData])
		}
		// outerPromise.then(res => console.log(res))
		// 	doc.get().then(async res => {
		// 		if (!res.exists) {
		// 			doc.set(
		// 				{
		// 					"😘": [],
		// 					"😊": [],
		// 					"😃": [],
		// 					"👎": [],
		// 					"❓": []
		// 				},
		// 				{ merge: true }
		// 			)
		// 		}
		// 		const data = await res.data()
		// 		setPrevDayData(prevState => [
		// 			...prevState,
		// 			{
		// 				date: res.id,
		// 				"😘": data["😘"].length,
		// 				"😊": data["😊"].length,
		// 				"😃": data["😃"].length,
		// 				"👎": data["👎"].length,
		// 				"❓": data["❓"].length
		// 			}
		// 		])
		// 	})
		// }
		outerPromise.then(res => {
			const prevDaysParsed = ["😘", "😊", "😃", "👎", "❓"].reduce(
				(endObj, emoji) => {
					endObj[emoji] = [
						...res.reduce((endArray, entry, i) => {
							endArray = [
								{
									date: entry["date"],
									percent:
										(res[i][emoji] /
											Object.keys(res[i])
												.filter(
													key => key !== `date` && key !== `day`
												)
												.reduce((sum, emoji) => {
													return sum + res[i][emoji]
												}, 0)) *
											100 || 0,
									count: res[i][emoji],
									day: entry["day"]
								},
								...endArray
							]
							return endArray
						}, [])
					]
					return endObj
				},
				{}
			)
			setPrevDayData(prevDaysParsed)
		})
	}, [prevDayCount, db])

	return (
		<>
			{Object.keys(prevDayData).length ? (
				<Subchart prevDayData={prevDayData} todayData={todayData} />
			) : (
				<div>lul</div>
			)}
		</>
	)
}
