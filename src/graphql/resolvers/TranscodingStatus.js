'use strict'

const SQL = require('../../connectors/mysql')
const { TranscodingStatus } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        transcodingStatus(_, { id }) {
            return TranscodingStatus.findById(id)
        },
        transcodingStatuses(){
            return TranscodingStatus.findAll()
        }
    }
}
