import React from "react"

export default function({ color, fontFamily, text }) {
	return (
		<h1 style={{ color, fontFamily }}>
			{!text
				? <br/>
				: text}
		</h1>
	)
}
