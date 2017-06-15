const { options, user, password, dbname } = require('../../config/').database
const wfeDB = require('wfe-db')
const { sql } = require('../utils/logger')

module.exports = wfeDB({
    user,
    password,
    dbname,
    options : Object.assign({}, options, {
        logging : sql
    })
})
