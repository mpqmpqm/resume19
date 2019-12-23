import React from 'react'

function Thumb (props) {
    
    if (!props.foundAct) {
        return null
    }

    else if (props.loading) {
        return null
    }

    else if (props.src.length > 0) {
        return (
            <img src = {props.src} alt = {props.alt}/> 
        )
    }

    return null

}

export default Thumb