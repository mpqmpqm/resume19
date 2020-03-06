import React, { useState } from 'react'

export default function ({instructions}) {

    const [count, setCount] = useState(0)

    const handleClick = () => {
        setCount (prevCount => prevCount+1)
    }


    return <div>{count}<button onClick={handleClick}>{instructions}</button></div>
}
