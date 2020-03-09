export function getDayDocs(str, db) {
	const dayCollection = db.collection(
		`users/demo/${str.slice(-4)}/${str.slice(4, 7)} ${str.slice(
			-4
		)}/${str}`
	)
	return {
		"😘": dayCollection.doc("😘"),
		"😊": dayCollection.doc("😊"),
		"😃": dayCollection.doc("😃"),
		"👎": dayCollection.doc("👎"),
		"❓": dayCollection.doc("❓")
	}
}
