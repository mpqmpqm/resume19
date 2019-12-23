import React from 'react'

function Act (props) {
    if (props.init) {
        return <h3>Enter a musical act</h3>
    }

    else if (props.loading) {
        return <h3>Loading...</h3>
    }

    else if (!props.foundAct) {
        return <h3>Not found. Please try again.</h3>
    }

    else {
        return <h3><a href = {props.link} target = '_blank' rel="noopener noreferrer">{props.name}</a></h3>
    }
}

export default Act