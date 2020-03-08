import React from "react"
import ReactEcharts from "echarts-for-react"

export const Echart = ({ prevDataParsed, todayParsed }) => {
	return (
		<ReactEcharts
			option={{
				xAxis: {
					type: "category",
					data: [
						...prevDataParsed["😘"].map(entry =>
							entry["date"].slice(0, 6)
						),
						todayParsed["😘"][0]["date"].slice(0, 6)
					]
				},
				yAxis: {
					type: "value",
					max: 100,
					name: `yoink`,
					nameLocation: `middle`,
					nameGap: 40,
					nameTextStyle: {
						fontFamily: `serif`
					}
				},
				series: [
					{
						data: [
							...prevDataParsed["😘"].map(entry => entry["percent"]),
							todayParsed["😘"][0]["percent"]
						],
						stack: "stack",
						areaStyle: {},
						symbol: `none`,
						type: "line",
						lineStyle: {
							color: `white`
						},
						smooth: 0.1
					},
					{
						data: [
							...prevDataParsed["😊"].map(entry => entry["percent"]),
							todayParsed["😊"][0]["percent"]
						],
						stack: "stack",
						areaStyle: {},
						type: "line"
					},
					{
						data: [
							...prevDataParsed["😃"].map(entry => entry["percent"]),
							todayParsed["😃"][0]["percent"]
						],
						stack: "stack",
						areaStyle: {},
						type: "line"
					},
					{
						data: [
							...prevDataParsed["👎"].map(entry => entry["percent"]),
							todayParsed["👎"][0]["percent"]
						],
						stack: "stack",
						areaStyle: {},
						type: "line"
					},
					{
						data: [
							...prevDataParsed["❓"].map(entry => entry["percent"]),
							todayParsed["❓"][0]["percent"]
						],
						stack: "stack",
						areaStyle: {},
						type: "line"
					}
				]
			}}
		/>
	)
}
