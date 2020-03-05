import React, {
	useState,
	useEffect,
	useContext,
	useReducer,
	useMemo
} from "react"
import { getPreviousDayDocs } from "../utils/getData"
import { addDocSnapshot } from "../utils/getData"
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
		// setPrevDayData([])
		const previousDayDocs = getPreviousDayDocs(prevDayCount, db)
		let outerPromise
		for (const dayDoc of previousDayDocs) {
			let dayData = {}
			let promise
			for (const emoji of Object.keys(dayDoc)) {
				promise = dayDoc[emoji]
					.get()
					.then(async res => {
						if (!res.exists) {
							dayDoc[emoji].set(
								{
									timestamps: []
								},
								{ merge: false }
							)
						}
						const emojiData = await res.data()
						dayData["date"] = res.ref.path.match(
							/\w{3} \d{2} \d{4}/g
						)[0]
						dayData[emoji] = emojiData["timestamps"].length
						return dayData
						// console.log(dayData)
					})
					.catch(err => console.error(err))
			}
			outerPromise = promise
				.then(async res => {
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
												.filter(key => key !== `date`)
												.reduce((sum, emoji) => {
													return sum + res[i][emoji]
												}, 0)) *
											100 || 0
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
			<div>hi</div>
			<button
				onClick={() => {
					// console.log(prevDayData)
				}}
			>
				Show
			</button>
			{Object.keys(prevDayData).length ? (
				<Subchart prevDayData={prevDayData} todayData={todayData} />
			) : (
				<div>lul</div>
			)}
			<button onClick={() => console.log(prevDayData)}>data</button>{" "}
		</>
	)
}
