const Hapi = require('hapi')
const Inert = require('inert')
const GraphQLServer = require('graphql-server-hapi')

const Config = require('../../config')
const SQL = require('../connectors/mysql')
const Logger = require('../utils/logger')
const Exit = require('../utils/exiter')
const Schema = require('../graphql/schema')

const Server = new Hapi.Server()
Server.connection({
    port : Config.api.port,
    routes : {
        cors : true
    }
})

Server.ext('onPreResponse', (req, rep) => {
    Logger.info(`Pre response : ${req.method.toUpperCase()}`, {
        id : req.id,
        path : req.path,
    })
    rep.continue()
})

Server.ext('onRequest', (req, rep) => {
    Logger.info(`Incoming request: ${req.method.toUpperCase()}`, {
        id : req.id,
        path : req.path,
    })
    rep.continue()
})

Server.register(Inert)
Server.route({
    method : 'GET',
    path : '/doc',
    handler : (request, reply) => {
        reply.file('./static/documentation.html')
    }
})

Server.route({
    method : 'OPTIONS',
    path : '/graphql',
    handler : (request, reply) => {
        let rep = reply({ ok : true })
        Object.keys(Config.api.headers).forEach((header) => {
            rep.header(header, Config.api.headers[header])
        })
    }
})

// Register plugins
Server.register([{
    register : GraphQLServer.graphqlHapi,
    options : {
        path : '/graphql',
        graphqlOptions : {
            schema : Schema,
            graphiql : true
        },
        route : {
            cors : true
        }
    }
}, {
    register : GraphQLServer.graphiqlHapi,
    options : {
        path : '/graphiql',
        graphiqlOptions : {
            endpointURL : '/graphql'
        }
    }
}])
    .then(() => {
        return SQL.sync().catch((err) => {
            Logger.warn(`MySQL Sync: ${err.message}`)

            if (Config.database.mandatory) {
                Exit.withError(new Error(`ERROR: Cannot synchronize MySQL database: ${err.message}`))
            }
        })
    })
    .then(() => {
        return Server.start((err) => {
            if (err) {
                Exit.withError(err)
            }
            Logger.info(`Server started on port ${Config.api.port}`)
        })
    })
    .catch(Exit.withError)
