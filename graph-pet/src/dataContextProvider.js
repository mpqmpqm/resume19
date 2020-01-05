import React, { useContext, useState, useEffect } from 'react'
import {FireContext} from './FireContextProvider'
import * as moment from 'moment'

const DataContext = React.createContext()

const DataContextProvider = (props) => {

    const today = moment()
    const {db} = useContext(FireContext)

    const getTodayDocRef = () => {
        const todayString = today.clone().format('MMM DD YYYY')
        return db.doc(`users/dev/${todayString.slice(-4)}/${todayString.slice(0,3)} ${todayString.slice(-4)}/dailys/${todayString}`)
    }

    const [todayDocRef, setTodayDocRef] = useState(getTodayDocRef);
    const [todayDataObject, setTodayDataObject] = useState({})
    
    const getTodayDataObject = () => {
        todayDocRef.get()
        .then (doc => setTodayDataObject (doc.data()))
        // .then (console.log(todayDataObject))
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

    const getLastDateStrings = (days) => {
        let lastDateStrings = [today.clone().format('MMM DD YYYY')];
        for (let i = 1; i < days; i++) {
            lastDateStrings = [today.clone().subtract(`${i}`, 'days').format('MMM DD YYYY'), ...lastDateStrings]
        }
        return lastDateStrings
    }

    const getLastDocRefs = (days) => {
        const lastDateStrings = getLastDateStrings(days)

        return lastDateStrings.map (dateString => (
            db.doc(`users/dev/${dateString.slice(-4)}/${dateString.slice(0,3)} ${dateString.slice(-4)}/dailys/${dateString}`)
        ))
    }

    useEffect(() => {
        getTodayDataObject();
    }, [])

    return (
        <DataContext.Provider value = {{getLastDocRefs, getLastDateStrings, todayDocRef, todayDataObject, setTodayDataObject}}>
            {props.children}
        </DataContext.Provider>
    )
}

export {DataContext, DataContextProvider}