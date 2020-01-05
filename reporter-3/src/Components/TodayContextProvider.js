import React, { useContext, useState, useEffect } from 'react'
import * as moment from 'moment'
import { FireContext } from './FireContextProvider'

const TodayContext = React.createContext()

const TodayContextProvider = (props) => {
    const today = moment()
    const {db} = useContext(FireContext)

    const todayDocRef = (() => {
        const todayString = today.clone().format('MMM DD YYYY')
        return db.doc(`users/dev/${todayString.slice(-4)}/${todayString.slice(0,3)} ${todayString.slice(-4)}/dailys/${todayString}`)
    })();

    const [todayDataObject, setTodayDataObject] = useState({})

    const getTodayDataObject = () => {
        todayDocRef.get()
        .then (doc => setTodayDataObject (doc.data()))
        .catch (() => {
            todayDocRef.set({
                '😘': [],
                '😊': [],
                '😃': [],
                '👎': [],
                '❓':[]
            }, {merge: true})
            .then(getTodayDataObject)
        })
    }

    useEffect(() => {
        getTodayDataObject();
    }, [])

    return (
        <TodayContext.Provider value = {{todayDocRef, todayDataObject, setTodayDataObject}}>
            {props.children}
        </TodayContext.Provider>
    )
} 

export {TodayContextProvider, TodayContext}