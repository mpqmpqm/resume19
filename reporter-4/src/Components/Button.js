import React from "react"

export const Button = ({ dispatch, type, target }) => {
	return (
		<button
			onClick={() => {
				dispatch({ type, target })
			}}
		>
			yoink
		</button>
	)
}
