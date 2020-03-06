const sheetsUrl = `https://docs.google.com/spreadsheets/d/1wdhHTAElDILmmyIG1G2Wsrjge5HBd4lDBuiJeZ65c3I/edit?usp=sharing`

const timeline = document.querySelector("#timeline")
const copyButton = document.querySelector("#copy-button")
let state

function init() {
	Tabletop.init({
		key: sheetsUrl,
		callback: function(data, tabletop) {
			state = data
			render(sortDecade(state))
		},
		simpleSheet: true
	})
	copyButton.addEventListener("click", copyToClipboard)
	window.addEventListener("click", handleDecadeClick)
}

function handleDecadeClick(event) {
	if (!event.target.matches("nav button")) {
		return
	}
	const filteredDecade = filterDecade(state, event.target.name)
	const sortedDecade = sortDecade(filteredDecade)
	render(sortedDecade)
}

function filterDecade(state, decade) {
	if (decade === "full") {
		return state
	} else {
		const [end, start] = [Number(decade) + 9, Number(decade)]
		return state.filter(event => {
			return Number(event.year) >= start && Number(event.year) <= end
		})
	}
}

function sortDecade(decadeArray) {
	return decadeArray.sort((a, b) => {
		const aDate = new Date(`${a.date} ${a.year}`)
		const bDate = new Date(`${b.date} ${b.year}`)

		if (aDate.toDateString() === bDate.toDateString()) {
			if (a.dateOrderOverride > b.dateOrderOverride) {
				return 1
			} else {
				return -1
			}
		} else {
			if (aDate > bDate) {
				return 1
			} else {
				return -1
			}
		}
	})
}

function render(data) {
	let yearsObject = consolidateYears(data)
	timeline.innerHTML =
		!Object.keys(yearsObject).length > 0
			? `<div class='empty'>Nothing to display</div`
			: Object.keys(yearsObject)
					.reverse()
					.map(year => {
						return `
						<div class = "year">
							<h2>${year}</h2>
							${yearsObject[year]
								.map(node => {
									return `
										<div class='node'>
											${
												node.imageSrc
													? `<div class='featured-image'><img src = '${node.imageSrc}' alt = '${node.imageAlt}' style = 'object-fit: ${node.imageFit};'}></div>`
													: ``
											}
											<div class='node-header'>
												<h3 class= "title">${node.event}</h3>
												${
													node.dateDisplayOverride !== "null"
														? `<h4 class = 'date'>${node.dateDisplayOverride ||
																node.date}</h4>`
														: ``
												} 
											</div>
											
											<div class="description">
												${parseParagraphs(node.description)}
											</div>
										</div>
										`
								})
								.join("")}		
							</div>
							`
					})
					.join("")
}

function consolidateYears(data) {
	return data.reduce((endObj, node) => {
		if (!Object.keys(endObj).includes(node.year)) {
			endObj[node.year] = []
		}

		endObj[node.year] = [
			...endObj[node.year],
			{
				date: node.date.trim(),
				event: node.event.trim(),
				description: node.description.trim(),
				imageSrc: node.imageSrc,
				imageAlt: node.imageDescription,
				imageFit: node.imageFit,
				dateDisplayOverride: node.dateDisplayOverride,
				dateOrderOverride: node.dateOrderOverride
			}
		]
		return endObj
	}, {})
}

function parseParagraphs(text) {
	const graphs = text
		.trim()
		.split("\n")
		.filter(text => text.length)
	const taggedGraphs = graphs.map(graph => `<p>${graph.trim()}</p>`)
	return taggedGraphs.join("")
}

function copyToClipboard() {
	const css = `<style>${Array.from(document.styleSheets[0].rules)
		.map(rule => rule.cssText)
		.join("")}</style>`
	const html = document.querySelector("main").innerHTML
	navigator.clipboard.writeText(css + html).then(
		function() {
			console.log("Copied to clipboard.")
		},
		function(err) {
			console.error("Error: ", err)
		}
	)
}
window.addEventListener("DOMContentLoaded", init)
