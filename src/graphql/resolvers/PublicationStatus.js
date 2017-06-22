'use strict'

const SQL = require('../../connectors/mysql')
const { PublicationStatus } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        publicationStatus(_, { id }) {
            return PublicationStatus.findById(id)
        },
        publicationStatuses(){
            return PublicationStatus.findAll()
        }
    }
}
