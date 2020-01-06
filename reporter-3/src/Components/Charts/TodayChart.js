import React, { useEffect, useState } from 'react'
import {VictoryChart, VictoryBar, VictoryPolarAxis} from 'victory'

const TodayChart = ({todayDataObject}) => {

    const parseForTodayChart = () => {
        let parsed = Object.keys(todayDataObject).reduce ((endArray, objectKey) => 
        {
            return [{key: objectKey, count: todayDataObject[objectKey].length}, ...endArray]    
        }, [])

        // console.log(parsed);
        return parsed
    } 
    
    const parsedToday = parseForTodayChart();

    return (
        <VictoryChart 
            polar
            domain={{x:[0,5]}}
            
        >
            <VictoryPolarAxis 
                style = {
                    {
                        axis:
                            {
                            strokeWidth: '2px'
                            }
                        ,
                    tickLabels: 
                        {
                        angle: 0, 
                        fontSize: 30, 
                        padding: 20
                        }
                    }
                    
                    
                }
            />
            <VictoryBar
                data={parsedToday}
                x="key"
                y="count"
                style={{ data: { fill: "#c43a31" , stroke: 'black', strokeWidth: '2px'}}}
            />
        </VictoryChart>
    )
}

export default TodayChart