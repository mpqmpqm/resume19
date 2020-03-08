import React from "react"
import ReactEcharts from "echarts-for-react"

export const Echart = ({ prevDataParsed, todayParsed }) => {
	return (
		<ReactEcharts
			// onChartReady={chart => chart.hideLoading()}
			// showLoading={true}
			// opts={{ renderer: "svg" }}
			option={{
				// grid: {
				// 	top: 0,
				// 	right: 0,
				// 	bottom: 0,
				// 	left: 0
				// },
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
							prevDataParsed[`😘`].length <= 16
								? 0
								: Math.floor(prevDataParsed[`😘`].length / 16),
						padding: [20, 0, 0, 0]
					},
					boundaryGap: [0, 0]
				},
				yAxis: {
					type: "value",
					max: 100,
					name: `Percent total reports`,
					nameLocation: `middle`,
					nameGap: 40,
					nameTextStyle: {}
				},
				tooltip: {
					trigger: `axis`,
					formatter: params => {
						return params.reverse().reduce((str, param) => {
							return (
								str +
								`${param[`seriesName`]}: ${
									param[`data`][`count`]
								}<br/>`
							)
						}, `${params[0][`name`]}<br/>Counts: <br/>`)
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
								areaStyle: { opacity: 0.9 },
								symbol: `none`,
								type: "line",
								lineStyle: {
									color: `white`
								},
								smooth: 0.1,
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
