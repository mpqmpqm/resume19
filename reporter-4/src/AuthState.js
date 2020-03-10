import React from "react"
import { useReducer } from "react"
import { useContext } from "react"

const Auth = React.createContext()

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "LOGIN_SUCCESS":
					return {
						...state,
						isAuthenticated: true,
						user: action.user,
						error: null
					}
				case "LOGOUT":
					return {
						...state,
						isAuthenticated: false
					}
				default:
					return { ...state }
			}
		},
		{
			isAuthenticated: true,
			user: null
		}
	)

	return (
		<Auth.Provider value={{ state, dispatch }}>
			{children}
		</Auth.Provider>
	)
}

export const useAuth = () => {
	let auth = useContext(Auth)
	return auth
}
