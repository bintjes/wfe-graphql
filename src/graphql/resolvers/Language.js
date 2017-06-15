'use strict'

const { Language } = require('../../connectors/mysql').models
const { computePagination } = require('./helpers/pagination')
const { prepareOptions } = require('./helpers/sequelize')

module.exports = {
    WfeQuery : {
        language(_, { id }) {
            return Language.findById(id)
        },

        languages(){
            return Language.findAll()
        },

    }


}
