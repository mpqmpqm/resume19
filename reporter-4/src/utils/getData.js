import { getDoc } from "./getDoc"

export function addDocSnapshot(todayDoc, setData, docExists = false) {
	let unsubscribe
	if (docExists) {
		unsubscribe = todayDoc.onSnapshot(doc => {
			setData(doc.data())
		})
	} else {
		todayDoc
			.get()
			.then(doc => {
				if (doc.exists) {
					addDocSnapshot(todayDoc, setData, true)
				} else {
					todayDoc
						.set(
							{
								"😘": [],
								"😊": [],
								"😃": [],
								"👎": [],
								"❓": []
							},
							{ merge: true }
						)
						.then(addDocSnapshot(todayDoc, setData, true))
				}
			})
			.catch(error => {
				console.log(error)
			})
	}
	return unsubscribe
}

export function getPreviousDateStrings(numDays) {
	return new Array(numDays)
		.fill("")
		.map((el, i) =>
			new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * (i + 1))
				.toDateString()
				.slice(4)
		)
}

export function getPreviousDayDocs(numDays, db) {
	return getPreviousDateStrings(numDays).map(str => getDoc(str, db))
}
