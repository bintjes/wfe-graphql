const Process = require('process')
const moment = require('moment')
const Winston = require('winston')
const Rotate = require('winston-daily-rotate-file')
const { log } = require('../../config/')

const ENV = Process.env.NODE_ENV || 'development'

Winston.transports.Rotate = Rotate

const Levels = {
    levels : {
        error : 0,
        warn : 1,
        info : 2,
        verbose : 3,
        debug : 4,
        sql : 5,
        silly : 6
    },
    colors : {
        sql : 'cyan'
    }
}

Winston.addColors(Levels.colors)
const Logger = new (Winston.Logger)({
    levels : Levels.levels,
    transports : log.map((transportConfig) => {
        let { transport, silentEnvs } = transportConfig

        transportConfig.timestamp = () => moment().format('YYYY-MM-DD HH:mm:ss.SSS')
        transportConfig.silent = silentEnvs.includes(ENV)

        return new (Winston.transports[transport])(transportConfig)
    })
})

module.exports = Logger
