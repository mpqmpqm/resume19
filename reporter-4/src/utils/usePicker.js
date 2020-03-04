import React, { useState, useContext } from "react"

const PickerContext = React.createContext()

export const PickerProvider = ({ children }) => {
	const [picker, setPicker] = useState(7)
	return (
		<PickerContext.Provider value={{ picker, setPicker }}>
			{children}
		</PickerContext.Provider>
	)
}

export const usePicker = () => {
	return useContext(PickerContext)
}
