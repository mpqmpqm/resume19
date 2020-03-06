import React, { useContext } from "react"
import { useToday } from "../utils/useToday"
import { FireContext } from "../FireContextProvider"
import "firebase/firestore"

export const ButtonMenu = () => {
	const {
		todayString,
		setTodayString,
		getTodayString,
		todayDocs
	} = useToday()

	const { firestore } = useContext(FireContext)

	function handleClick(e) {
		const emoji = e.target.name || e.target.innerText
		addOne(emoji)
	}

	function addOne(emoji) {
		if (todayString !== getTodayString()) {
			setTodayString(getTodayString())
		}

		todayDocs[emoji]
			.update({
				timestamps: firestore.FieldValue.arrayUnion(new Date())
			})
			.catch(error => console.log(error))
	}

	return (
		<div className="button-menu">
			<button name="😘" onClick={handleClick}>
				<span role="img" aria-label="kiss">
					😘
				</span>
			</button>
			<button name="😊" onClick={handleClick}>
				<span role="img" aria-label="warm">
					😊
				</span>
			</button>
			<button name="😃" onClick={handleClick}>
				<span role="img" aria-label="laugh">
					😃
				</span>
			</button>
			<button name="👎" onClick={handleClick}>
				<span role="img" aria-label="thumbs down">
					👎
				</span>
			</button>
			<button name="❓" onClick={handleClick}>
				<span role="img" aria-label="questioning">
					❓
				</span>
			</button>
		</div>
	)
}
