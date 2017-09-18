const Fs = require('fs')
const Path = require('path')
const graphqlTools = require('graphql-tools')
const Logger = require('../../utils/logger')

const Encoding = 'utf8'
const resolvers = require('../resolvers')
const SchemaDef = `
    schema {
        query: WfeQuery
        mutation: WfeMutation
    }
`


const isGraphql = (file) => /\.graphql/.test(file)
const importGraphql = (folder) => {
    const path = Path.join(__dirname, folder)
    return Fs.readdirSync(path)
        .filter(isGraphql)
        .map((file) => {
        file = Path.join(path, file)

    Logger.debug(`Reading ${file}`)
    return Fs.readFileSync(file, Encoding)
})
.join("\n")
}

const definitions = ['queries', 'types', 'mutations', 'enums', 'inputs', 'interfaces']
    .map(importGraphql)
    .join("\n")

function makeExecutableSchema () {
    return graphqlTools.makeExecutableSchema({
        typeDefs : [
            definitions,
            SchemaDef
        ],
        resolvers,
        logger : {
            log : (e) => {
            Logger.debug(e)
    }
}
})
}
module.exports = makeExecutableSchema()
module.exports.clone = makeExecutableSchema
