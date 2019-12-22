import React from 'react';
import Line from './Line'

function Field () {
    
    const makeCoords = (step) => {
       
        let lineCoords = [];
        
        for (let i = 0; i < 100; i+=step) {
            lineCoords.push ( 
                {
                    x1: '0',
                    y1: `${i}%`,
                    x2: '100%',
                    y2: `${100-i}%`
                }
            )
        }

        for (let i = 100; i > 0; i-=step) {
            lineCoords.push ( 
                {
                    x1: `${i}%`,
                    y1: `0`,
                    x2: `${100-i}%`,
                    y2: `100%`
                }
            )
        }

        return lineCoords
    }

    const lines = makeCoords(1).map((set, index) => {
        return (
            <Line 
                x1 = {set.x1}
                y1 = {set.y1}
                x2 = {set.x2}
                y2 = {set.y2}
                key = {index}
            />
            )

 })
    
    return (
        <svg 
            height = {window.innerHeight}
            width = {window.innerWidth}>
                {lines}
        </svg>
    )
}

export default Field