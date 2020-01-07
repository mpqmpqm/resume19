import React, { useEffect, useContext, useState } from 'react'
import {FireContext} from '../Context/FireContextProvider'
import {VictoryChart, VictoryLine, VictoryAxis} from 'victory'

let dataObject = {}

const MultiDayChart = ({todayDataObject, pastDays, todayDateString, today}) => {
    
    const {db} = useContext(FireContext)
    const [parsedDataObject, setParsedDataObject] = useState({}
    )
    const [loading, setLoading] = useState (true)

    const totalToday = Object.keys(todayDataObject).reduce((sum, emoji) => {
        sum += todayDataObject[emoji].length
        return sum
    }, 0)

    const todayParsed = 
        [
            '😘',
            '😊',
            '😃',
            '👎',
            '❓'
        ].reduce ((endObj, emoji) => {
            
            endObj[emoji] = [
                {
                    date: todayDateString, 
                    count: Math.floor((todayDataObject[emoji].length/totalToday)*100) || 0
                }
            ]

            return endObj
        }, {})

    useEffect(() => {
        // console.log(today);
        const lastDateStrings = getLastDateStrings(pastDays);
        const lastDocRefs = getLastDocRefs(lastDateStrings);
        setLastDocs(lastDocRefs)
        dataObject = (prepLastDataObject(lastDateStrings))
        dataObject = (parseLastData(lastDateStrings, lastDocRefs, dataObject))
        // console.log(showDataObject());
    }, [])

    function getLastDateStrings (pastDayCount) {
        let lastDateStrings = [];
        for (let i = 1; i <= pastDayCount; i++) {
            lastDateStrings = [today.clone().subtract(`${i}`, 'days').format('MMM DD YYYY'), ...lastDateStrings]
        }
        return lastDateStrings
    }

    
    function getLastDocRefs (lastDateStrings) {
        return lastDateStrings.map (dateString => (
            db.doc(`users/MPQ/${dateString.slice(-4)}/${dateString.slice(0,3)} ${dateString.slice(-4)}/dailys/${dateString}`)))
    }

    function setLastDocs (lastDocRefs) {
        lastDocRefs.forEach(docRef => {
            docRef.get()
            .then (doc => 
                {
                    if (!doc.exists)
                    {
                        docRef.set({
                            '😘': [],
                            '😊': [],
                            '😃': [],
                            '👎': [],
                            '❓': []
                        }, {merge: true})
                    }
                }
            )
        })
    }
    
    function prepLastDataObject (lastDateStrings) {
        let lastDataObject = 
            lastDateStrings.reduce ((endObj, dateString) => {
                endObj[dateString] = 0
                return endObj
            }, {})
        return lastDataObject
    }
    
    async function parseLastData (lastDateStrings, lastDocRefs, dataObject) {
        for (let i = 0; i < lastDocRefs.length; i++) {
            await lastDocRefs[i].get()
            .then (doc => {
                dataObject[lastDateStrings[i]] =  doc.data()
            })
        }

        // console.log(dataObject);
        // console.log(dataObject["Dec 30 2019"]);

        // console.log(dataObject);

        const totalsParsed = Object.keys(dataObject).reduce ((endObj, date) => {
            endObj[date] = dataObject[date]
            endObj[date]['totalReports'] =  
                Object.keys(endObj[date]).reduce ((sum, emoji) => {
                    sum += endObj[date][emoji].length
                    return sum
                }, 0)
            return endObj
        }, {})

        const parsedObject = 
            [
                '😘',
                '😊',
                '😃',
                '👎',
                '❓'
            ].reduce ((endObj, emoji) => {
                endObj[emoji] = 
                    Object.keys(dataObject).reduce((endArray, key) => {
                        endArray = [...endArray, {
                            date: key,
                            count: Math.floor((dataObject[key][emoji].length/totalsParsed[key]['totalReports'])*100) || 0
                        }]
                        return endArray
                    }, [])
                return endObj
            }, {})

        setParsedDataObject(parsedObject)
        setLoading (false)
    }

    
    return (
        <>
        {loading ? <div className='chart'>Loading...</div> : (
        <VictoryChart
        domainPadding={{x: [0, 10], y: 10}}
            >
            <VictoryAxis  
                style={{ ticks: {stroke: 'black', size: 5}, tickLabels: { padding: 12, fontSize: 10, angle: -30}}}
                tickCount={pastDays+1}
            />
            <VictoryAxis dependentAxis 
                tickFormat = {((text) => `${text}%`)}
                tickCount={5}
                animate={{ duration: 1000 }}
            
                
                />

            {
                [
                    {
                        emoji: '😘',
                        stroke: '#00ABFD'
                    },
                    {
                        emoji: '😊',
                        stroke: '#FD8B3F'
                    },
                    {
                        emoji: '😃',
                        stroke: '#1431C9'
                    },
                    {
                        emoji: '👎',
                        stroke: '#3C4A96'
                    },
                    {
                        emoji: '❓',
                        stroke: '#C94214'
                    },
                ].map (pair => (
                    <VictoryLine 
                        data={[...parsedDataObject[pair.emoji], ...todayParsed[pair.emoji]]}
                        x= {'date'}
                        y = {'count'}
                        labels={({index}) => (index === String(pastDays) ? pair.emoji: '')}
                        interpolation='natural'
                        style={{data: {stroke: pair.stroke, strokeWidth: '4px'}, labels: {fontSize:20, padding:0 }}}
                        animate={{ duration: 1000 }}
                        key={pair.emoji}
                    />
                ))
            }
            
            {/* <VictoryLine 
                data={[...parsedDataObject['😘'], ...todayParsed['😘']]}
                x= {'date'}
                y = {'count'}
                labels={({index}) => index == pastDays ? '😘': ''}
                interpolation='natural'
                style={{data: {stroke: '#00ABFD', strokeWidth: '4px'}, labels: {fontSize:20, padding:4 }}}
                animate={{ duration: 100 }}
            />
            <VictoryLine 
                data={[...parsedDataObject['😊'], ...todayParsed['😊']]}
                x= {'date'}
                y = {'count'}
                labels={({index}) => index == pastDays ? '😊': ''}
                interpolation='natural'
                style={{data: {stroke: '#FD8B3F', strokeWidth: '4px'}, labels: {fontSize:20, padding:4 }}}
                animate={{ duration: 100 }}
            />
            <VictoryLine 
                data={[...parsedDataObject['😃'], ...todayParsed['😃']]}
                x= {'date'}
                y = {'count'}
                labels={({index}) => index == pastDays ? '😃': ''}
                interpolation='natural'
                style={{data: {stroke: '#C94214', strokeWidth: '4px'}, labels: {fontSize:20, padding:4 }}}
                animate={{ duration: 100 }}
            />
            <VictoryLine 
                data={[...parsedDataObject['👎'], ...todayParsed['👎']]}
                x= {'date'}
                y = {'count'}
                labels={({index}) => index == pastDays? '👎': ''}
                interpolation='natural'
                style={{data: {stroke: '#3C4A96', strokeWidth: '4px'}, labels: {fontSize:20, padding:4 }}}
                animate={{ duration: 100 }}
            />
            <VictoryLine 
                data={[...parsedDataObject['❓'], ...todayParsed['❓']]}
                x= {'date'}
                y = {'count'}
                labels={({index}) => index == pastDays ? '❓': ''}
                interpolation='natural'
                style={{data: {stroke: '#1431C9', strokeWidth: '4px'}, labels: {fontSize:20, padding:4 }}}
                animate={{ duration: 100 }}
            /> */}
        </VictoryChart>
        )}
        </>
    )
}

export default MultiDayChart