import React, { useContext, useState } from 'react'
import {FireContext} from './FireContextProvider'

const Pet = () => {
    const {firestore, db} = useContext(FireContext)
    // const [toSend, setToSend] = useState({})

    const todayCompare = new Date().toLocaleDateString('en-us', {month: 'short', year: 'numeric', day: '2-digit'})
    const todayYear = todayCompare.slice(-4)
    const todayMonth = todayCompare.slice(0,3)

    const dev = db.collection('users').doc('dev')
    const doc = db.doc(`users/dev/${todayYear}/${todayMonth} ${todayYear}`)

    const lol = 
            {
                '😘': [22,23,28,29,210],
                '😊': [4,5,6,7,8],
                '😃': [2,3,4,5]
            }

    function sendData () {
        for (let key of Object.keys(lol)) {
            unloadPlaceGun(key)
    }}

    function unloadPlaceGun (emoji) {
        while (lol[emoji].length) {
            doc.update (
                {
                    [`${todayCompare}.${emoji}`]: firestore.FieldValue.arrayUnion (
                        lol[emoji][0]
                    )
                }
            )
            lol[emoji].shift()
        }
    }

    // reports: firestore.FieldValue.arrayUnion ({today: {
    //     kisses: firestore.FieldValue.arrayUnion (timestamp)
    // }})

    function getData () {
        dev.get()
        .then (doc => console.log(doc.data()))
    }

    return (
    <>
    <button onClick={sendData}>Send data</button>
    <button onClick={getData}>Get data</button>
    </>
    )
}

export default Pet