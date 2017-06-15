const Process = require('process')
const Commander = require('commander')
const { version } = require('./../package.json')

global.Promise = require('bluebird')

Process.env.NODE_ENV = Process.env.NODE_ENV || 'development'

Commander
  .version(version)
  .option('-w, --watch', 'Watch for file changes and auto reloads')
  .option('-m, --mock', 'Run server on mock mode. All calls will return auto generated random data')
  .parse(process.argv)

if (Commander.watch) {
    require('./utils/watcher') // eslint-disable-line
}

if (Commander.mock) {
    require('./server/mock') // eslint-disable-line
} else {
    require('./server/normal') // eslint-disable-line
}
