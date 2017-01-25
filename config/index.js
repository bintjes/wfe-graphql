const Yaml = require('js-yaml')
const Fs = require('fs')
const Path = require('path')
const lazy = require('lazy.js')

const yamlLoad = (path) => {
    return Yaml.safeLoad(Fs.readFileSync(path))
}

module.exports = lazy({}).merge(
    yamlLoad(Path.join(__dirname, 'config-dist.yml')),
    yamlLoad(Path.join(__dirname, 'config.yml'))
).toObject()
