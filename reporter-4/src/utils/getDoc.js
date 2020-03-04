export function getDoc(str, db) {
	return db.doc(
		`users/MPQ/${str.slice(-4)}/${str.slice(0, 3)} ${str.slice(
			-4
		)}/dailys/${str}`
	)
}
