import React, { useState } from "react"
import { Chart2 } from "./Chart2"

export const ChartPicker = () => {
	const [inputValue, setInputValue] = useState(7)
	const [picker, setPicker] = useState(inputValue)

	function handleSubmit(e) {
		e.preventDefault()
		setPicker(Number(inputValue))
		setInputValue(``)
	}

	function handleChange(e) {
		setInputValue(e.target.value)
	}

	return (
		<>
			<Chart2 prevDayCount={picker} />
			<form onSubmit={handleSubmit}>
				<input value={inputValue} onChange={handleChange}></input>
				<button>Submit</button>
			</form>
		</>
	)
}
