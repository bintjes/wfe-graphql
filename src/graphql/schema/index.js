const Fs = require('fs')
const Path = require('path')
const graphqlTools = require('graphql-tools')
const Logger = require('../utils/logger')

const Encoding = 'utf8'
const resolvers = require('../resolvers')
const SchemaDef = `
    schema {
        query: WfeQuery
    }
`


const isGraphql = (file) => /\.graphql/.test(file)
const definitionsPath = Path.join(__dirname, 'definitions')

const definitions = Fs.readdirSync(definitionsPath)
    .filter(isGraphql)
    .map((file) => {
        file = Path.join(definitionsPath, file)
        
        Logger.debug(`Reading ${file}`)
        return Fs.readFileSync(file, Encoding)
    })
    .join()

module.exports = graphqlTools.makeExecutableSchema({
    typeDefs : [
        definitions,
        SchemaDef
    ],
    resolvers
})
