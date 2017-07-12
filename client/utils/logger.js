class Logger {
	static log() {
		console.log('-----------------log.start--------------------------')
		console.log('=>', ...arguments)
		console.log('-----------------log.end----------------------------')
	}

	static warn() {
		console.log('-----------------log.start--------------------------')
		console.warn('=>', ...arguments)
		console.log('-----------------log.end----------------------------')
	}

	static error() {
		console.log('-----------------log.start--------------------------')
		console.error('=>', ...arguments)
		console.log('-----------------log.end----------------------------')
	}
}

module.exports = Logger
