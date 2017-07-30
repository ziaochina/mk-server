
const config = (options) => {
	Object.assign(current, options)
	return current
}

const current = {
	// myOptin: "initValue",
}

module.exports = Object.assign(config, {
	current,
})
