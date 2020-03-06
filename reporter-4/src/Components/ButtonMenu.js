import React, { useContext, useState } from "react"
import { useToday } from "../utils/useToday"
import { FireContext } from "../FireContextProvider"
import "firebase/firestore"

export const ButtonMenu = () => {
	const {
		todayString,
		setTodayString,
		getTodayString,
		todayDocs,
		todayData
	} = useToday()

	const { firestore } = useContext(FireContext)
	const [dataShowing, setDataShowing] = useState(false)

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
			{[
				["😘", "kiss"],
				["😊", "warm"],
				["😃", "laugh"],
				["👎", "thumbs-down"],
				["❓", "questioning"]
			].map(pair => (
				<button
					name={pair[0]}
					onClick={handleClick}
					disabled={dataShowing}
					key={pair[0]}
					className="report-button"
				>
					<span role="img" aria-label={pair[1]}>
						{!dataShowing
							? pair[0]
							: todayData[pair[0]]["timestamps"].length}
					</span>
				</button>
			))}
			<button
				onMouseDown={() => setDataShowing(true)}
				onMouseUp={() => setDataShowing(false)}
			>
				Show
			</button>
		</div>
	)
}
