const Hapi = require('hapi')
const Schema = require('../schema')
const Config = require('../config')
const Logger = require('../utils/logger')
const { mockServer } = require('graphql-tools')
const { graphiqlHapi } = require('graphql-server-hapi')
const { exit } = require('process')

const Server = new Hapi.Server()

Server.connection({
    port : Config.api.port,
    routes : {
        cors : true
    }
})

const { query } = mockServer(Schema)
Server.route({
    method : 'POST',
    path : '/graphql',
    handler : (request, reply) => {
        const payload = request.payload.query

        reply(
            query(payload)
        )
    }
})

Server.register([{
    register : graphiqlHapi,
    options : {
        path : '/graphiql',
        graphiqlOptions : {
            endpointURL : '/graphql'
        }
    }
}]).then(Server.start.bind(Server))
    .catch((err) => {
        Logger.error(`Mock server can't be started: ${err}`)
        exit(1)
    })
