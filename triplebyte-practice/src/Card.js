import React from "react"

export default function(props) {
	return (
		<div className="card">
			<button>&larr;</button>
			    {props.children}
			<button>&rarr;</button>
		</div>
	)
}
