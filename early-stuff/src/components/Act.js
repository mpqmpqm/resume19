import React from 'react'

function Act (props) {
    if (props.init) {
        return <h2>Enter a musical act, get back their earliest releases.</h2>
    }

    else if (props.loading) {
        return <h2>Loading...</h2>
    }

    else if (!props.foundAct) {
        return <h2>Not found. Please try again.</h2>
    }

    else {
        return <h2><a href = {props.link} target = '_blank' rel="noopener noreferrer">{props.name}</a></h2>
    }
}

export default Act