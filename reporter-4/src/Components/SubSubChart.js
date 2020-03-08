import React from "react"
import {
	VictoryChart,
	VictoryLine,
	VictoryAxis,
	VictoryArea,
	VictoryStack,
	VictoryTheme,
	VictoryLegend,
	VictoryTooltip
} from "victory"

export const SubSubChart = ({ todayParsed, prevDataParsed }) => {
	return (
		<>
			<VictoryChart>
				<VictoryAxis
					style={{
						ticks: { stroke: "black", size: 5 },
						tickLabels: {
							padding: 12,
							fontSize: 10,
							angle: -30
						}
					}}
					tickCount={10}
					tickFormat={text => text.slice(0, 6)}
				/>
				<VictoryAxis
					dependentAxis
					label="Percent total reports"
					tickFormat={text => `${text}%`}
					tickValues={[0, 100]}
					// animate={{ duration: 1000 }}
				/>

				{/* <VictoryLegend
					x={225}
					y={0}
					// title="Legend"
					centerTitle
					orientation="horizontal"
					gutter={20}
					style={{
						border: { stroke: "black" },
						title: { fontSize: 20 }
					}}
					data={[
						{ name: "😘", symbol: { fill: "tomato" } },
						{ name: "😊", symbol: { fill: "orange" } },
						{ name: "😃", symbol: { fill: "gold" } }
					]}
				/> */}

				<VictoryStack
					colorScale={[
						"#968FCC",
						"#686299",
						"#CCE1FF",
						"#FFD6A3",
						"#D1BEB2"
					]}

					// theme={VictoryTheme.material}
				>
					{[
						{
							emoji: "😘",
							stroke: "#968FCC"
						},
						{
							emoji: "😊",
							stroke: "#686299"
						},
						{
							emoji: "😃",
							stroke: "#CCE1FF"
						},
						{
							emoji: "👎",
							stroke: "#FFD6A3"
						},
						{
							emoji: "❓",
							stroke: "#D1BEB2"
						}
					]
						.reverse()
						.map(pair => {
							// console.log(todayParsed[pair.emoji])
							// console.log(pair.emoji)
							// console.log(
							// 	JSON.stringify(todayParsed[pair.emoji]["date"])
							// )
							return (
								<VictoryArea
									// key={pair.emoji}
									data={[
										...prevDataParsed[pair.emoji],
										...todayParsed[pair.emoji]
									]}
									x={"date"}
									y={"percent"}
									// labels={({ index }) =>
									// 	index === String(pastDays) ? pair.emoji : ""
									// }
									labels={() => pair.emoji}
									labelComponent={<VictoryTooltip />}
									interpolation="catmullRom"
									style={{
										data: {
											stroke: "white",
											strokeWidth: "1px"
										},
										labels: { fontSize: 20, padding: 0 }
									}}
									animate={{ duration: 200 }}
									key={pair.emoji}
								/>
							)
						})}
				</VictoryStack>
				{/* <VictoryChart domainPadding={{ x: [0, 10], y: 10 }}>
				<VictoryAxis
					style={{
						ticks: { stroke: "black", size: 5 },
						tickLabels: {
							padding: 12,
							fontSize: 10,
							angle: -30
						}
					}}
					tickCount={
						prevDataParsed.length < 12 ? prevDataParsed.length : 12
					}
					tickFormat={text => text.slice(0, 6)}
				/>
				<VictoryAxis
					dependentAxis
					tickFormat={text => `${text}%`}
					tickCount={5}
					animate={{ duration: 1000 }}
				/>

				{[
					{
						emoji: "😘",
						stroke: "#00ABFD"
					},
					{
						emoji: "😊",
						stroke: "#FD8B3F"
					},
					{
						emoji: "😃",
						stroke: "#1431C9"
					},
					{
						emoji: "👎",
						stroke: "#3C4A96"
					},
					{
						emoji: "❓",
						stroke: "#C94214"
					}
				].map(pair => {
					// console.log(todayParsed[pair.emoji])
					// console.log(pair.emoji)
					// console.log(
					// 	JSON.stringify(todayParsed[pair.emoji]["date"])
					// )
					return (
						<VictoryLine
							data={[
								...prevDataParsed[pair.emoji],
								...todayParsed[pair.emoji]
							]}
							x={"date"}
							y={"percent"}
							// labels={({ index }) =>
							// 	index === String(pastDays) ? pair.emoji : ""
							// }
							interpolation="natural"
							style={{
								data: {
									stroke: pair.stroke,
									strokeWidth: "2px"
								},
								labels: { fontSize: 20, padding: 0 }
							}}
							animate={{ duration: 200 }}
							key={pair.emoji}
						/>
					)
				})}
			</VictoryChart>
			</> */}
			</VictoryChart>
		</>
	)
}
