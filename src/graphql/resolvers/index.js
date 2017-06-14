const Fs = require('fs')
const lazy = require('lazy.js')

const modules = Fs.readdirSync(__dirname)
    .filter((file) => file !== 'index.js')
    .map((file) => require(`./${file}`)) // eslint-disable-line global-require

module.exports = lazy({})
    .merge(...modules)
    .toObject()
