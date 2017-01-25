const Path = require('path')
const Chokidar = require('chokidar')
const Logger = require('./logger')
const Process = require('process')

Logger.info('Starting watchers')
const ROOT = Path.resolve(__dirname)
const PATH_TO_WATCH = Path.resolve(ROOT, '..')

const watcher = Chokidar.watch(PATH_TO_WATCH, {
    ignored : /[\/\\]\./,
    persistent : true
})

watcher.on('change', (path) => {
    Logger.info(`File ${path} has changed`)
    Logger.debug('Restarting the server')
    Process.exit(0)
})
