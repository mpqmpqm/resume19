import React from "react"
import "./App.css"
import { ButtonMenu } from "./Components/ButtonMenu"
import { useAuth } from "./AuthState"
import { ChartPicker } from "./Components/ChartPicker"
import { useToday } from "./utils/useToday"
import { Demo } from "./utils/setDemo"

function App() {
	const { state, dispatch } = useAuth()
	const { todayData } = useToday()

	// console.log(todayData)

	return !state.isAuthenticated ? (
		<>
			<button
				onClick={() => {
					dispatch({ type: "LOGIN_SUCCESS" })
				}}
			>
				Login
			</button>
			<div>{JSON.stringify(todayData)}</div>
		</>
	) : (
		<div className="App">
			{/* <Demo /> */}
			<ChartPicker />
			<ButtonMenu />
		</div>
	)
}

export default App
