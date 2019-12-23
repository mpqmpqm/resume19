import React from 'react' 
import Album from './Album'

function Albums (props) {
    
    if (!props.foundAct) {
        return null
    }
    
    else if (props.loading) {
        return <h3>Loading...</h3>
    }
    else {
        return (
            <div>
                <Album title = {props.titles[0]} year = {props.years[0]} loading = {props.loading}/>
                <Album title = {props.titles[1]} year = {props.years[1]} loading = {props.loading}/>
                <Album title = {props.titles[2]} year = {props.years[2]} loading = {props.loading}/>
            </div>
        )
    }
}

export default Albums
