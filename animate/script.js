const clickie = document.querySelector("#clickie")

clickie.addEventListener("click", handleClick)

function handleClick(e) {
	const { clientX, clientY } = e
	const { name } = e.target
	draw(clientX, clientY, name)
	draw(clientX, clientY, name)
	draw(clientX, clientY, name)
	draw(clientX, clientY, name)
	setTimeout(() => {
		draw(clientX, clientY, name)
	}, 10)
	setTimeout(() => {
		draw(clientX, clientY, name)
		draw(clientX, clientY, name)
	}, 20)
}

function draw(clientX, clientY, name) {
	const el = document.createElement("div")
	el.textContent = name
	el.className = "animate"
	el.style.position = "absolute"
	el.style.top = `${clientY - 30}px`
	el.style.left = `${clientX - 10}px`
	document.body.append(el)
	animate(el)
}

function animate(el) {
	const tx =
		(Math.random() * (40 - 10) + 10) * (Math.random() > 0.5 ? -1 : 1)
	const neg = tx > 0 ? 1 : -1
	const a = Math.random() * (1 - 0.9) + 0.9
	const d = a
	const b = Math.random() * 0.5 * neg
	const c = -b
	const ty = Math.random() * (160 - 40) + 40

	setTimeout(() => {
		el.style.transform = `matrix(${a},${b},${c},${d},${tx},-${ty})`
		el.style.opacity = 0
		// el.style.transition = `transform 0.3s, opacity .8s`

		setTimeout(() => {
			el.remove()
		}, 1500)
	}, 20)
	// setTimeout(() => {
	// 	el.style.transform = ``
	// }, 10)
}
