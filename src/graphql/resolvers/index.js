'use strict'

const Fs = require('fs')
const lazy = require('lazy.js')
const Logger = require('../../utils/logger')

const modules = Fs.readdirSync(__dirname)
    .filter((file) => !['index.js', 'helpers', 'filters'].includes(file))
    .map((file) => {
        Logger.info(`Loading resolver: ${file}`)
        return require(`./${file}`) // eslint-disable-line global-require
    })

module.exports = lazy({})
    .merge(...modules)
    .toObject()
