'use strict'

const SQL = require('../../connectors/mysql')
const { User } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        user(_, { id }) {
            return User.findById(id)
        },
        users(){
            return User.findAll()
        }
    }
}
