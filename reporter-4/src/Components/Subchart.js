import React, { useEffect, useState } from "react"
import { useToday } from "../utils/useToday"
import { SubSubChart } from "./SubSubChart"
import { Echart } from "./EChart"

export const Subchart = ({ prevDayData, todayData }) => {
	const { todayString, todayReady, setTodayReady } = useToday()

	const [todayParsed, setTodayParsed] = useState({})

	useEffect(() => {
		let todayParsed = Object.keys(todayData).reduce(
			(endObj, emoji) => {
				endObj[emoji] = [
					{
						date: todayString.slice(4),
						percent:
							(todayData[emoji][`count`] /
								Object.keys(todayData).reduce((sum, emoji) => {
									return sum + todayData[emoji][`count`]
								}, 0)) *
								100 || 0,
						count: todayData[emoji][`count`],
						day: todayString.slice(0, 3)
					}
				]
				return endObj
			},
			{}
		)
		setTodayParsed(todayParsed)
		setTodayReady(true)
	}, [todayData])

	// console.log(todayParsed)

	// useEffect(() => {
	// 	todayParsed = Object.keys(todayData).reduce((endObj, emoji) => {
	// 		endObj[emoji] = [
	// 			{
	// 				date: todayString,
	// 				percent:
	// 					(todayData[emoji]["timestamps"].length /
	// 						Object.keys(todayData).reduce((sum, emoji) => {
	// 							return sum + todayData[emoji]["timestamps"].length
	// 						}, 0)) *
	// 						100 || 0
	// 			}
	// 		]
	// 		return endObj
	// 	}, {})
	// }, [todayData, todayString])

	return (
		<div className="chart">
			{Object.keys(todayParsed).length ? (
				<Echart
					prevDataParsed={prevDayData}
					todayParsed={todayParsed}
				/>
			) : (
				// <SubSubChart
				// 	prevDataParsed={prevDayData}
				// 	todayParsed={todayParsed}
				// />
				<div>
					<button onClick={() => console.log(`tester`)}>wut</button>
				</div>
			)}
		</div>
	)
}
