import React from 'react'

const Button = (props) => <button onClick = {props.onClick} name={props.name}>{props.content}</button>

export default Button