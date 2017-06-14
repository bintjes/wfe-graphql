const Logger = require('./logger')
const { exit } = require('process')

exports.withError = (error) => {
    Logger.error(error)

    // Display stack trace for debugging
    if (error instanceof Error) {
        Logger.debug(error)
    }

    exit(1)
}
