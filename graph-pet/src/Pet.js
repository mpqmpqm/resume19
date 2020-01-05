import React, { useContext, useState, useEffect } from 'react'
import {FireContext} from './FireContextProvider'

import {DataContext} from './dataContextProvider'
import DataParser from './DataParser' 

const Pet = () => {
    const {firestore, db} = useContext(FireContext)
    const {getLastDocRefs, getLastDateStrings, todayDataObject, setTodayDataObject} = useContext(DataContext)
     
    const [lastDocRefs, setLastDocRefs] = useState(getLastDocRefs(30))
    const [lastDateStrings, setLastDateStrings] = useState(getLastDateStrings(30))

    useEffect(() => {
        lastDocRefs.forEach((doc) => {
            doc.set({ 
                }, {merge: true})
        });
    }, [])
    

    // function getDaysData () {
    //     todayDoc.get()
    //     .then (doc => doc.data())
    //     .then (data => {
    //         setDaysData ([data, ...daysData])
    //     })
    // }

    // getDaysData();
    // console.log(daysData);

    // const getDaysFirebase = () => {
    //     (dayDocs.forEach (doc => {
    //         doc.get()
    //         .then (doc => {
    //             setDaysData(prevState => [doc.data(), ...prevState])})
    //     }))
    //     // return daysData
    // }

    // function saveDatesData () {
    //     // let i = 0;

    //     //     return dayDocs.reduce(async function (endObj, doc) {
            
    //     //         endObj[i] = await (doc.get()
    //     //         .then (doc => doc.data()))

    //     //         i++;
                
    //     //         return endObj

    //     // }, [])

    //     // setDaysData([])
         
        
    //     dayDocs.forEach ((doc) => {
    //         doc.get()
    //         .then (doc => setDaysData ([...daysData, doc.data()]))
    //     })
        
    //     // for (let i  = 0; i < dayDocs.length; i++) {
    //     //     dayDocs[i].get()
    //     //     .then (doc =>  datesData.push((doc.data())))
    //     // }


        
    //     // let datesData = dayDocs.map(doc => {
    //     //     let dayData = (doc.get()
    //     //                     .then (doc => doc.data())
    //     //                     )
    //     //     return dayData
    //     //     }
    //     //     )
    //     // let spread = Array.from(datesData)
    //     }   

    
        
    // function showDatesData () {
    //     // console.log(saveDatesData());
    // }    
    

    // saveDatesData()

//    getDaysFirebase();
//    console.log(daysData);

    // getTodayFirebase();

    // const setLastSeven = () => {

    // }

    const lol = 
            {
                '😘': [22,23,28,29,210],
                '😊': [4,5,6,7,8],
                '😃': [12,39,43,65],
                '👎': [17,25,33,42,51],
                '❓': [12,72,93,40,15]
            }

    const placeGunObject = {
        hello: [],
        goodbye: []
    }

    function loadPlaceGunObject (event) {
        const {name} = event.target
        placeGunObject[name] = [...placeGunObject[name], new Date()]
        console.log(placeGunObject);
    }

    
    function sendData () {
        for (let key of Object.keys(lol)) {
            unloadPlaceGun(key)
    }}

    function unloadPlaceGun (emoji) {
        while (lol[emoji].length) {
            lastDocRefs[lastDocRefs.length-1].update (
                {
                    [`${emoji}`]: firestore.FieldValue.arrayUnion (
                        lol[emoji][0]
                    )
                }
            )
            lol[emoji].shift()
        }
    }

    function unloadPlaceGunDemo () {
        Object.keys(placeGunObject).forEach (key => {
            console.log(`Unloading placeGunObject.${key}`);
            while (placeGunObject[key].length) {
                console.log(placeGunObject[key][0])
                placeGunObject[key].shift()
            }
        }
                
            )
        }

    function changeTodayDataObject () {
        setTodayDataObject({...todayDataObject, '😘': [...todayDataObject['😘'], 42, 43]})
    }

    // reports: firestore.FieldValue.arrayUnion ({today: {
    //     kisses: firestore.FieldValue.arrayUnion (timestamp)
    // }})

    function getData () {
        // dev.get()
        // .then (doc => console.log(doc.data()))
    }

    return (
    <>
        <button onClick={loadPlaceGunObject} name='hello'>Hello</button>
        <button onClick={loadPlaceGunObject} name='goodbye'>Goodbye</button>
        <button onClick={unloadPlaceGunDemo}></button>

        <button onClick={changeTodayDataObject}>{todayDataObject['😘'] &&todayDataObject['😘']}</button>
        <DataParser docRefs = {lastDocRefs} dateStrings = {lastDateStrings} firebase = {{firestore, db}}/>
    </>
    )
}

export default Pet