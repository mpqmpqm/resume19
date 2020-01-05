import React, { useContext } from 'react'
import { FireContext } from './Context/FireContextProvider'
import { TodayContext } from './Context/TodayContextProvider'

const ButtonArray = () => {

    const {db, firestore} = useContext(FireContext)
    const {todayDocRef, todayDataObject, setTodayDataObject} = useContext(TodayContext)

    const handleClick = (e) => {

    }


    return (
        <div className='buttonArray'>
            Stuff down here stays?
        </div>
    )
}

export default ButtonArray