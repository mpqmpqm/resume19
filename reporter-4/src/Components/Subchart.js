import React, {
	useEffect,
	useMemo,
	useState,
	useCallback
} from "react"
import { useToday } from "../utils/useToday"

export const Subchart = ({ todayData, prevDayData }) => {
	const { todayString } = useToday()

	const [todayParsed, setTodayParsed] = useState()

	const parseToday = useCallback(
		function parseToday(todayData) {
			console.log(`parsing today`)
			const totalToday = Object.keys(todayData).reduce(
				(sum, emoji) => {
					sum += todayData[emoji].length
					return sum
				},
				0
			)

			return ["😘", "😊", "😃", "👎", "❓"].reduce(
				(endObj, emoji) => {
					endObj[emoji] = [
						{
							date: todayString,
							percent:
								Math.floor(
									(todayData[emoji].length / totalToday) * 100
								) || 0
						}
					]
					return endObj
				},
				{}
			)
		},
		[todayString]
	)

	useEffect(() => {
		setTodayParsed(parseToday(todayData))
	}, [todayData, parseToday])

	const prevDaysParsed = useMemo(() => {
		console.log(`rememo`)
		const prevDaysParsed = ["😘", "😊", "😃", "👎", "❓"].reduce(
			(endObj, emoji) => {
				endObj[emoji] = [
					...prevDayData.reduce((endArray, entry, i) => {
						endArray = [
							...endArray,
							{
								date: entry["date"],
								percent:
									Math.floor(
										(prevDayData[i][emoji] /
											Object.keys(prevDayData[i])
												.filter(key => key !== `date`)
												.reduce((sum, emoji) => {
													return sum + prevDayData[i][emoji]
												}, 0)) *
											100
									) || 0
							}
						]
						return endArray
					}, [])
				]
				return endObj
			},
			{}
		)
		return prevDaysParsed
	}, [prevDayData])
	return <div>{Object.keys(prevDaysParsed)[0]}</div>
}
