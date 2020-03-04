import React from "react"
import "./App.css"
import { ButtonMenu } from "./Components/ButtonMenu"
import { useAuth } from "./AuthState"
import { ChartPicker } from "./Components/ChartPicker"

function App() {
	const { state, dispatch } = useAuth()

	return !state.isAuthenticated ? (
		<button
			onClick={() => {
				dispatch({ type: "LOGIN_SUCCESS" })
			}}
		>
			Login
		</button>
	) : (
		<div className="App">
			<ChartPicker />
			<ButtonMenu />
		</div>
	)
}

export default App
