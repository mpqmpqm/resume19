import React from "react"
import ReactEcharts from "echarts-for-react"
// import { E_CHART_CONFIG } from "../utils/eChartConfig"

export const Echart = ({ prevDataParsed, todayParsed }) => {
	const prevDayCount = prevDataParsed[`😘`].length
	console.log(prevDataParsed)
	return (
		<ReactEcharts
			option={{
				color: [
					`#3A86FF`,
					`#8338EC`,
					`#FF006E`,
					`#FB5607`,
					`#FFBE0B`
				],
				xAxis: {
					type: "category",
					axisTick: {
						alignWithLabel: true
					},
					// boundaryGap: true,
					axisLabel: {
						rotate: 45,
						formatter: value => value.slice(0, 6),
						interval:
							prevDayCount <= 16 ? 0 : Math.floor(prevDayCount / 16),
						padding: [20, 0, 0, 0]
					},
					boundaryGap: [0, 0]
				},
				yAxis: {
					type: "value",
					max: 100,
					name: `Percent total reports`,
					nameLocation: `middle`,
					// nameGap: 40,
					nameTextStyle: {},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: false
					}
				},
				tooltip: {
					transitionDuration: 0,
					trigger: `axis`,
					formatter: params => {
						return params.reverse().reduce((str, param) => {
							return (
								str +
								`${param[`seriesName`]}: ${param[`data`][`count`]} ${
									param[`data`][`count`] === 1 ? `report` : `reports`
								}<br/>`
							)
						}, `${params[0][`name`]} (${params[0][`data`][`day`]})<br/>`)
					}
				},
				dataset: [
					...["😘", "😊", "😃", "👎", "❓"].map(emoji => {
						return {
							source: [
								...prevDataParsed[emoji],
								...todayParsed[emoji]
							]
						}
					})
				],
				series: [
					...["😘", "😊", "😃", "👎", "❓"]
						.reverse()
						.map((emoji, i) => {
							return {
								encode: {
									x: `date`,
									y: `percent`
								},
								stack: "stack",
								areaStyle: { opacity: 0.8 },
								symbol: `none`,
								type: "line",
								lineStyle: {
									color: `white`
								},
								smooth: 0.2,
								datasetIndex: 4 - i,
								name: emoji
							}
						})
				]

				// 	{
				// 		data: [
				// 			...prevDataParsed["😊"].map(entry => entry["percent"]),
				// 			todayParsed["😊"][0]["percent"]
				// 		],
				// 		stack: "stack",
				// 		areaStyle: {},
				// 		type: "line"
				// 	},
				// 	{
				// 		data: [
				// 			...prevDataParsed["😃"].map(entry => entry["percent"]),
				// 			todayParsed["😃"][0]["percent"]
				// 		],
				// 		stack: "stack",
				// 		areaStyle: {},
				// 		type: "line"
				// 	},
				// 	{
				// 		data: [
				// 			...prevDataParsed["👎"].map(entry => entry["percent"]),
				// 			todayParsed["👎"][0]["percent"]
				// 		],
				// 		stack: "stack",
				// 		areaStyle: {},
				// 		type: "line"
				// 	},
				// 	{
				// 		data: [
				// 			...prevDataParsed["❓"].map(entry => entry["percent"]),
				// 			todayParsed["❓"][0]["percent"]
				// 		],
				// 		stack: "stack",
				// 		areaStyle: {},
				// 		type: "line"
				// 	}
				// ]
			}}
		/>
	)
}
