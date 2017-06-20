'use strict'

const SQL = require('../../connectors/mysql')
const { Rule } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        rule(_, { id }) {
            return Rule.findById(id)
        },
        rules(){
            return Rule.findAll()
        },
    }
}
