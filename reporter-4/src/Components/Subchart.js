import React, { useEffect, useState } from "react"
import { useToday } from "../utils/useToday"
import { SubSubChart } from "./SubSubChart"
import { Echart } from "./EChart"

export const Subchart = ({ prevDayData, todayData }) => {
	const { todayString } = useToday()

	// const [todayParsed, setTodayParsed] = useState([])

	let todayParsed = Object.keys(todayData).reduce((endObj, emoji) => {
		endObj[emoji] = [
			{
				date: todayString,
				percent:
					(todayData[emoji]["timestamps"].length /
						Object.keys(todayData).reduce((sum, emoji) => {
							return sum + todayData[emoji]["timestamps"].length
						}, 0)) *
						100 || 0,
				count: todayData[emoji]["timestamps"].length
			}
		]
		return endObj
	}, {})
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
