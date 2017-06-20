'use strict'

const SQL = require('../../connectors/mysql')
const { Task } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        task(_, { id }) {
            return Task.findById(id)
        },
        tasks(){
            return Task.findAll()
        },
    }
}
