import {FireContext} from '../reporter-3/src/Components/Context/FireContextProvider'
import React, { useContext, useState } from 'react'
import * as moment from 'moment'

let realData 

const DataMigrator = () => {

    const {db, firestore} = useContext(FireContext)

    function migrateData() {
        let doc = db.doc(`users/MPQ/`)

        doc.get()
        .then ((doc) => {
            realData = doc.data().reports
            console.log(realData);
    })}

    function parseReal(data) {
        let dataArray = data
        let dataObject = dataArray.reduce((endObj, report) => {

            if (!endObj.hasOwnProperty(moment.unix(report.timestamp.seconds).format('MMM DD YYYY'))) {
                        
                endObj[moment.unix(report.timestamp.seconds).format('MMM DD YYYY')] = {
                        '😘':[],
                        '😊':[],
                        '😃':[],
                        '👎':[],
                        '❓':[]
                }
            } else {
                endObj[moment.unix(report.timestamp.seconds).format('MMM DD YYYY')][report.mood] = [
                    ...endObj[moment.unix(report.timestamp.seconds).format('MMM DD YYYY')][report.mood], report.timestamp
                ]
            }
            return endObj
        }, {})
        realData = dataObject
        console.log(realData);
    }
    
    function upload() {
        let docRef = db.doc(`users/z_backup`)
        docRef.get()
            .then (doc => 
                {
                    if (doc.exists)
                    {
                        docRef.set({
                            reports: realData
                            // '😘': realData['Jan 06 2020']['😘'],
                            // '😊': realData['Jan 06 2020']['😊'],
                            // '😃':realData['Jan 06 2020']['😃'],
                            // '👎':realData['Jan 06 2020']['👎'],
                            // '❓':realData['Jan 06 2020']['❓']
                        }, {merge: false})
                    }
                    console.log(`Set!`);
                }
            )

    }

    return (
    <>
        <button onClick={migrateData}>Migrate</button>
        <button onClick={() => {upload()}}>Upload</button>
    </>)
}

export default DataMigrator
