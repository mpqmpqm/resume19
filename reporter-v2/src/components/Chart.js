import React, { useEffect, useState, useContext } from 'react'
import {FireContext} from './FireContextProvider'

const Chart = (props) => {
    //firebase init
    const firebaseApp = useContext(FireContext)
    const {firebase_} = firebaseApp;
    const {firestore} = firebase_;
    const db = firestore(firebaseApp);
    const reports = db.collection('users').doc('MPQ')

    //state
    const [reportsData, setReportsData] = useState({})
    const [counts, setCounts] = useState({})
    // const [reportsData, setReportsData] = useState([])

    const getData = () => {
        reports.get()
            .then (doc => {
                if (doc.exists){
                     setReportsData (doc.data().reports);
                } else {
                    return
                }
            })
            .then (() => {parseData()})
            .catch (error => {console.log("Error:", error);})
        
        
    }

    const parseData = () => {
        console.log(reportsData);
        const kisses = reportsData.filter(obj => obj.mood === '😘')
        console.log(kisses.length);
        setCounts({...counts, kisses: kisses.length})
    }
    


    return (
        <>
        <button onClick={()=>{getData()}}>Get data</button>
        <button onClick={()=>{parseData()}}>Parse</button>
        <span>{counts.kisses}</span>
        </>
    )

}

export {Chart}
