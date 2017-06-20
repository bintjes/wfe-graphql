'use strict'

const SQL = require('../../connectors/mysql')
const { WorkflowHn } = require('../../connectors/mysql').models
module.exports = {
    WfeQuery : {
        workflowHn(_, { id }) {
            return WorkflowHn.findByPrimary(id)
        },
        workflowHns(){
            return WorkflowHn.findAll()
        },
    }
  
}
