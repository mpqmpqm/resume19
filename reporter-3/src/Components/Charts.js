import React, { useContext } from 'react'
import { FireContext } from './Context/FireContextProvider'
import { TodayContext } from './Context/TodayContextProvider'
import {Link, Route, Switch} from 'react-router-dom'
import TodayChart from './Charts/TodayChart'

const Charts = () => {
    const {db, firestore} = useContext (FireContext)
    const {today, todayDataObject} = useContext(TodayContext)

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

    return (
        <>
            <Switch>
                <Route path='/reporter-3/today'>
                    {<TodayChart todayDataObject={todayDataObject} />}
                </Route>
                <Route path='/reporter-3/last7'>
                    {/* <LastSevenGraph getDocRefs = {getLastDocRefs}/> */}
                </Route>
                <Route path='/reporter-3/last14'>
                    {/* <LastFortnightGraph /> getDocRefs = {getLastDocRefs}*/}
                </Route>

            </Switch>
            <nav>
                <Link to='/reporter-3/today'>Today</Link>
                <Link to='/reporter-3/last7'>Past week</Link>
                <Link to='/reporter-3/last14'>Past fortnight</Link>
            </nav>
        </>
    )

}


export default Charts