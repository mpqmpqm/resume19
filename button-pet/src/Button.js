import React, {useState} from 'react'

const Button = (props) => {

    const [items, setItems] = useState([])
    const [lastClick, setLastClick] = useState(new Date())
    const [newClick, setNewClick] = useState(true)
    const [execute, setExecute] = useState (false)
    const [timerKey, setTimerKey] = useState(0)

    const handleClick = () => {
        setExecute(false)
        setLastClick(new Date())
        setItems(items => ([...items, {id: 1, mpq: 'mpq'}]))
        if (!timerKey) {
            let timer = setTimeout (checkLastClick, 2000)
            setTimerKey(timer)
        }
        
        else if (timerKey) {
            clearTimeout(timerKey)
            let timer = setTimeout (checkLastClick, 2000)
            setTimerKey(timer)
        }
        // console.log(lastClick);
    }

    const checkLastClick = () =>{
        setExecute(true)
        setTimeout(() => {
            setExecute(false)
            setItems([])
        }, 4000);
    }


    return (
        <>
        <button onClick={handleClick}>Click</button>
        <h1>{execute ? 'Execute' : 'Wait'}</h1>
        <h2>then: {lastClick.toLocaleString()}</h2>
        {execute ? (items.map(item => (
            <p>{item.id}{item.mpq}</p>))) : null}
        
        </>
    )
}

export default Button