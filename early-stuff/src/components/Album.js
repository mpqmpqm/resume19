import React from 'react'


function Album (props) {
    
    if (props.loading) {
        return <h3>Loading...</h3>
    }

    else if (props.title) {
        return <h3>{props.title} {props.year ? `(${props.year})` : null}</h3>
    }

    else {
        return null
    }
}

export default Album