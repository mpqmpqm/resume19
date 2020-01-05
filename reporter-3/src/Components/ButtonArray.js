import React, { useContext, useState, useEffect } from 'react'
import { FireContext } from './Context/FireContextProvider'
import { TodayContext } from './Context/TodayContextProvider'
import {Link} from 'react-router-dom'

let placeGunObject = {
    '😘': [],
    '😊': [],
    '😃': [],
    '👎': [],
    '❓': []    
}

let firstClick = true
let timerKey = 0

const ButtonArray = ({toggleData, isDataShowing}) => {

    const {db, firestore} = useContext(FireContext)
    const {todayDocRef, todayDataObject, setTodayDataObject} = useContext(TodayContext)
    
    // const [placeGunObject, setPlaceGunObject] = useState ({
    //     '😘': [],
    //     '😊': [],
    //     '😃': [],
    //     '👎': [],
    //     '❓': []
    // })

    // const [timerKey, setTimerKey] = useState(0)
    // const [firstClick, setFirstClick] = useState(true)

    const handleClick = (e) => {
        const emoji = e.target.name || e.target.innerHTML

        setTodayDataObject (
            {...todayDataObject, 
                [emoji]: [...todayDataObject[emoji], new Date()]}
        )

        loadPlaceGunObject (emoji)
        dataReadyCheck()
    }

    // function loadPlaceGunObject(emoji) {
    //     setPlaceGunObject (
    //         {...placeGunObject,
    //         [emoji]: [...placeGunObject[emoji], new Date()]
    //         }
    //     )
    //     console.log(placeGunObject);
    // }

    function loadPlaceGunObject(emoji) {
        placeGunObject = {
            ...placeGunObject,
            [emoji]: [...placeGunObject[emoji], new Date()]
            }
        // console.log(placeGunObject);
    }

    // function dataReadyCheck () {
    //     if (firstClick) {
    //         setFirstClick (false);
    //         let timer = setTimeout (unloadPlaceGunObject, 1000)
    //         setTimerKey (timer)
    //       }
    // }

    function dataReadyCheck () {
        if (firstClick) {
            firstClick = false;
            let timer = setTimeout (unloadPlaceGunObject, 200)
            timerKey = timer
          } else 
          {
            clearTimeout(timerKey)
            let timer = setTimeout (unloadPlaceGunObject, 200)
            timerKey = timer
          }
    }
    // function unloadPlaceGunObject(){
    //     Object.keys(placeGunObject).forEach(key => {
    //         console.log(`Unloading ${key}`);
    //         while (placeGunObject[key].length){
    //             console.log(placeGunObject[key][0]);
    //             placeGunObject[key].shift()
    //         }
    //     }
    //     )
    //     setPlaceGunObject (
    //         {
    //             '😘': [],
    //             '😊': [],
    //             '😃': [],
    //             '👎': [],
    //             '❓': []
    //         }
    //     )
    // }

    function unloadPlaceGunObject(){
        Object.keys(placeGunObject).forEach(key => {
            while (placeGunObject[key].length){
                todayDocRef.update(
                    {[key]: firestore.FieldValue.arrayUnion(placeGunObject[key][0])}
                )
                .catch (error => console.log(error))
                placeGunObject[key].shift()                
            }
        }
        )
        
        placeGunObject = 
            {
                '😘': [],
                '😊': [],
                '😃': [],
                '👎': [],
                '❓': []
            }
        firstClick = true
    }


    return (
        <div className='buttonArray'>
            <button 
                onClick={toggleData}
                id='show-data'
            >
                {isDataShowing ? 
                    <Link to='/reporter-3/'>
                        Hide data
                    </Link> : 
                    <Link to='/reporter-3/today'>Show data</Link>}
                </button> 
            <button 
                onClick={handleClick}
                name='😃'
                id='laugh'
            >
                <span 
                    role='img' 
                    aria-label='laugh'>😃
                </span>
            </button>
            <button 
                onClick={handleClick}
                name='😊'
                id='warm'
                >
                <span 
                    role='img' 
                    aria-label='warm'>😊
                </span>
                </button>
            <button 
                onClick={handleClick}
                name='😘'
                id='kiss'
            >
                <span 
                    role='img' 
                    aria-label='kiss'>😘
                </span>
            </button>
            <button 
                onClick={handleClick}
                name='👎'
                id='thumbs-down'
                >
                <span 
                    role='img' 
                    aria-label='thumbs down'>👎
                </span>
            </button>
            <button 
                onClick={handleClick}
                name='❓'
                id = 'question'
                >
                <span 
                    role='img' 
                    aria-label='question'>❓
                </span>
            </button>
            
        </div>
    )
}

export default ButtonArray