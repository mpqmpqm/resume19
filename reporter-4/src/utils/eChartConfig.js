export const eChartConfig = (days, mobile = false) => {
	return {
		color: [`#3A86FF`, `#8338EC`, `#FF006E`, `#FB5607`, `#FFBE0B`],
		xAxis: {
			type: "category",
			axisTick: {
				alignWithLabel: true
			},
			axisLabel: {
				rotate: 45,
				formatter: value => value.slice(0, 6),
				interval: mobile
					? days <= 7
						? 0
						: days / 7
					: days <= 16
					? 0
					: days / 16,
				padding: [20, 0, 0, 0]
			},
			boundaryGap: [0, 0]
		},
		yAxis: {
			type: "value",
			max: 100,
			name: `Percent total reports`,
			nameLocation: `middle`,
			nameTextStyle: {},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: false
			}
		},
		tooltip: {
			trigger: `axis`,
			formatter: params => {
				return params.reverse().reduce((str, param) => {
					return (
						str +
						`${param[`seriesName`]}: ${param[`data`][`count`]}<br/>`
					)
				}, `${params[0][`name`]}<br/>Counts: <br/>`)
			}
		}
	}
}
