import React, { useEffect } from "react"
import { FireContext } from "../FireContextProvider"
import { getPreviousDayDocs } from "./getData"

export const Demo = () => {
	const { db } = React.useContext(FireContext)
	let i = 0

	useEffect(() => {
		console.log(i)
		const previousDayDocs = getPreviousDayDocs(120, db)

		function roll(prevRoll = true, streak) {
			let roll
			if (Math.random() < 0.9) {
				if (Math.random() > streak / 100) {
					roll = prevRoll
				} else roll = !prevRoll
			} else roll = !prevRoll
			return [roll, roll === prevRoll ? streak + 1 : 1]
		}

		function helper(count) {
			let prevRoll = true
			let rolls = []
			let streak = 1
			for (let i = 0; i <= count; i++) {
				;[prevRoll, streak] = roll(prevRoll, streak)
				rolls = [...rolls, prevRoll]
			}
			return rolls
		}

		function show() {
			let rolls = helper(120)
			return rolls.map(roll => {
				if (roll) {
					return new Array(100).fill("").map(button => {
						let chance = Math.random()
						if (chance < 0.98) {
							let buttonSelect = Math.random()
							if (buttonSelect > 2 / 3) {
								return "😘"
							} else if (
								buttonSelect < 2 / 3 &&
								buttonSelect > 1 / 3
							) {
								return "😊"
							} else return "😃"
						} else {
							let buttonSelect = Math.random()
							if (buttonSelect > 0.9) {
								return "👎"
							} else return "❓"
						}
					})
				} else {
					return new Array(100).fill("").map(button => {
						let chance = Math.random()
						if (chance > 0.9) {
							let buttonSelect = Math.random()
							if (buttonSelect > 1 / 3) {
								return "😘"
							} else if (buttonSelect > 1 / 8) {
								return "😊"
							} else return "😃"
						} else {
							let buttonSelect = Math.random()
							if (buttonSelect < 0.8) {
								return "👎"
							} else return "❓"
						}
					})
				}
			})
		}

		const rolls = show(120)

		function parse(rolls) {
			return rolls.map(roll => {
				const counts = roll.reduce((object, entry) => {
					if (!object.hasOwnProperty(entry)) {
						object[entry] = 0
					}
					object[entry] = object[entry] + 1
					return object
				}, {})

				if (Object.keys(counts) !== 5) {
					const missing = ["😘", "😊", "😃", "👎", "❓"].filter(
						emoji => !counts.hasOwnProperty(emoji)
					)
					missing.forEach(emoji => {
						counts[emoji] = 0
					})
				}
				return counts
			})
		}
		const objects = parse(rolls)
		console.log(JSON.stringify(objects))

		// let i = 0

		for (const dayDoc of previousDayDocs) {
			let promise
			for (const emoji of Object.keys(dayDoc)) {
				promise = dayDoc[emoji].get().then(async res => {
					// if (res.exists) {
					console.log(i)
					const array = new Array(objects[i][emoji]).fill(`demo`)
					console.log(`${emoji}: ${objects[i][emoji]}`)
					console.log(array)
					dayDoc[emoji]
						.set(
							{
								timestamps: array
							},
							{ merge: false }
						)
						.then(`Doc written~`)
						.catch(`Failed...`)
					// }
				})
			}
			promise.then(() => {
				i += 1
			})
		}
	}, [])

	return <div>k</div>
}
